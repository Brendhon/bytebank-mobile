import Button from '@/components/form/Button';
import Input from '@/components/form/Input';
import Modal from '@/components/modal/Modal';
import {
  Transaction,
  TransactionDesc,
  TransactionInput,
  TransactionType,
} from '@/models/transaction';
import { TransactionFormData, transactionSchema } from '@/schemas/transaction.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';

interface TransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onSaved: (transaction: Transaction) => void;
  transaction?: Transaction | null;
  onSubmitRequest: (payload: TransactionInput, id?: string) => Promise<Transaction>;
}

export default function TransactionModal({
  visible,
  onClose,
  onSaved,
  transaction,
  onSubmitRequest,
}: TransactionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = transaction ? 'Editar Transação' : 'Nova Transação';

  // Derive type from description (only deposit is inflow)
  const deriveTypeFromDesc = (desc: TransactionDesc): TransactionType => {
    return desc === TransactionDesc.DEPOSIT ? TransactionType.INFLOW : TransactionType.OUTFLOW;
  };

  const defaultValues: TransactionFormData = useMemo(
    () => ({
      desc: transaction?.desc ?? TransactionDesc.PAYMENT,
      type: transaction ? transaction.type : deriveTypeFromDesc(TransactionDesc.PAYMENT),
      alias: transaction?.alias ?? '',
      // If editing and server returns negative values for outflows, show absolute number to the user
      value: typeof transaction?.value === 'number' ? Math.abs(transaction!.value) : 0,
      date: transaction?.date || '',
    }),
    [transaction]
  );

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      desc: TransactionDesc.PAYMENT,
      type: deriveTypeFromDesc(TransactionDesc.PAYMENT),
      alias: '',
      value: 0,
      date: '',
    },
  });

  const watched = watch();

  // Reset form values whenever the modal opens or the transaction changes
  useEffect(() => {
    if (visible) reset(defaultValues);
  }, [visible, defaultValues, reset]);

  const handleSave = async (data: TransactionFormData) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const payload: TransactionInput = {
        alias: data.alias?.trim() || undefined,
        value: data.value,
        date: data.date,
        desc: data.desc,
        type: data.type,
      };

      const saved = await onSubmitRequest(payload, transaction?._id);
      onSaved(saved);
      handleClose();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a transação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const renderSegment = <T extends string>(
    label: string,
    options: { label: string; value: T }[],
    selected: T,
    onSelect: (v: T) => void,
    disabled?: boolean
  ) => {
    return (
      <View className="gap-2">
        <Text className={styles.segmentLabel}>{label}</Text>
        <View className={styles.segmentGroup}>
          {options.map((opt) => (
            <Button
              key={opt.value}
              onPress={() => !disabled && onSelect(opt.value)}
              disabled={disabled}
              variant={selected === opt.value ? 'green' : 'outlineGreen'}
              className={styles.segmentButton}
              accessibilityLabel={`Selecionar ${opt.label}`}
              accessibilityHint={disabled ? 'Campo desativado' : undefined}
            >
              {opt.label}
            </Button>
          ))}
        </View>
      </View>
    );
  };

  const descOptions: { label: string; value: TransactionDesc }[] = [
    { label: 'Depósito', value: TransactionDesc.DEPOSIT },
    { label: 'Pagamento', value: TransactionDesc.PAYMENT },
    { label: 'Transferência', value: TransactionDesc.TRANSFER },
    { label: 'Saque', value: TransactionDesc.WITHDRAWAL },
  ];

  const typeOptions: { label: string; value: TransactionType }[] = [
    { label: 'Entrada', value: TransactionType.INFLOW },
    { label: 'Saída', value: TransactionType.OUTFLOW },
  ];

  return (
    <Modal visible={visible} onClose={handleClose} title={title}>
      <View className={styles.formContainer}>
        {renderSegment<TransactionDesc>(
          'Descrição',
          descOptions,
          watched.desc,
          (v) => {
            setValue('desc', v, { shouldValidate: true });
            setValue('type', deriveTypeFromDesc(v), { shouldValidate: true });
          }
        )}

        {renderSegment<TransactionType>(
          'Tipo',
          typeOptions,
          watched.type,
          () => { },
          true
        )}

        <Input
          label="Apelido"
          placeholder="Ex.: Mercado, Uber..."
          value={watched.alias || ''}
          onChangeText={(t) => setValue('alias', t, { shouldValidate: true })}
          error={errors.alias?.message}
        />

        <Input
          label="Valor"
          placeholder="0,00"
          type="number"
          value={Number.isFinite(watched.value) ? String(watched.value) : ''}
          onChangeText={(t) => {
            const normalized = t.replace(/,/g, '.');
            const parsed = parseFloat(normalized);
            setValue('value', Number.isFinite(parsed) ? parsed : 0, { shouldValidate: true });
          }}
          error={errors.value?.message}
        />

        <Input
          label="Data"
          placeholder="DD/MM/AAAA"
          type="date"
          value={watched.date}
          onChangeText={(t) => setValue('date', t, { shouldValidate: true })}
          error={errors.date?.message}
        />

        <View className={styles.buttonContainer}>
          <Button
            variant="green"
            onPress={handleSubmit(handleSave)}
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  formContainer: 'gap-4',
  buttonContainer: 'flex-col items-center gap-6 pt-4',
  segmentLabel: 'text-dark text-lg font-bold',
  segmentGroup: 'flex-row flex-wrap gap-2',
  segmentButton: 'h-10',
};


