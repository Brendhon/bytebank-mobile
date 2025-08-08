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
import { Calendar, DollarSign } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import TransactionIllustration from '../illustrations/TransactionIllustration';

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
    if (visible) {
      reset(defaultValues);
    }
    // "reset" is stable enough; excluding it prevents unnecessary re-runs that may cause loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, defaultValues]);

  const handleAliasChange = useCallback((t: string) => {
    setValue('alias', t, { shouldValidate: true });
  }, [setValue]);

  const handleValueChange = useCallback((t: string) => {
    // Keep numeric conversion simple; empty -> 0 to satisfy schema later via validation
    const numeric = t.trim() === '' ? 0 : Number(t);
    setValue('value', Number.isFinite(numeric) ? numeric : 0, { shouldValidate: true });
  }, [setValue]);

  const handleDateChange = useCallback((t: string) => {
    setValue('date', t, { shouldValidate: true });
  }, [setValue]);

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

  const illustration = useMemo(() => <TransactionIllustration />, []);
  const dollarIcon = useMemo(() => <DollarSign />, []);
  const calendarIcon = useMemo(() => <Calendar />, []);

  return (
    <Modal visible={visible} onClose={handleClose} title={title} illustration={illustration}>
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
          onChangeText={handleAliasChange}
          error={errors.alias?.message}
        />

        <Input
          label="Valor"
          placeholder="0,00"
          type="number"
          value={Number.isFinite(watched.value) ? String(watched.value) : ''}
          onChangeText={handleValueChange}
          error={errors.value?.message}
          icon={dollarIcon}
        />

        <Input
          label="Data"
          placeholder="DD/MM/AAAA"
          type="date"
          value={watched.date}
          onChangeText={handleDateChange}
          error={errors.date?.message}
          icon={calendarIcon}
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


