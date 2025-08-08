import Button from '@/components/form/Button';
import FileUpload from '@/components/form/FileUpload';
import Input from '@/components/form/Input';
import Modal from '@/components/modal/Modal';
import { useAuth } from '@/contexts/AuthContext';
import { useReceiptUpload } from '@/hooks/useReceiptUpload';
import {
  Transaction,
  TransactionDesc,
  TransactionInput,
  TransactionType,
} from '@/models/transaction';
import { TransactionFormData, transactionSchema } from '@/schemas/transaction.schema';
import { formatDateToInput } from '@/utils/date';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, DollarSign } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import TransactionIllustration from '../illustrations/TransactionIllustration';

// Move function outside component to prevent recreation
const deriveTypeFromDesc = (desc: TransactionDesc): TransactionType => {
  return desc === TransactionDesc.DEPOSIT ? TransactionType.INFLOW : TransactionType.OUTFLOW;
};

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
  const [pendingFile, setPendingFile] = useState<Blob | null>(null);
  const [pendingFileName, setPendingFileName] = useState<string | null>(null);
  const { user } = useAuth();

  const {
    receiptUrl,
    isUploading,
    uploadError,
    uploadReceipt,
    deleteReceipt,
    getReceiptUrl,
    clearReceipt
  } = useReceiptUpload();

  const title = transaction ? 'Editar Transação' : 'Nova Transação';

  const defaultValues: TransactionFormData = useMemo(
    () => ({
      desc: transaction?.desc ?? TransactionDesc.DEPOSIT,
      type: transaction ? transaction.type : deriveTypeFromDesc(TransactionDesc.DEPOSIT),
      alias: transaction?.alias ?? '',
      value: typeof transaction?.value === 'number' ? Math.abs(transaction!.value) : 0,
      date: transaction?.date || formatDateToInput(),
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
    defaultValues,
  });

  // Watch specific fields instead of entire form to reduce re-renders
  const watchedDesc = watch('desc');
  const watchedType = watch('type');
  const watchedAlias = watch('alias');
  const watchedValue = watch('value');
  const watchedDate = watch('date');

  // Reset form values only when modal becomes visible
  useEffect(() => {
    if (visible) {
      reset(defaultValues);
      setPendingFile(null);
      setPendingFileName(null);

      // If editing, try to get receipt URL
      if (transaction?._id && user?._id) {
        getReceiptUrl(user._id, transaction._id);
      }
    } else {
      clearReceipt();
      setPendingFile(null);
      setPendingFileName(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Handle alias change
  const handleAliasChange = useCallback((t: string) => {
    setValue('alias', t, { shouldValidate: true });
  }, [setValue]);

  // Handle value change
  const handleValueChange = useCallback((t: string) => {
    const numeric = t.trim() === '' ? 0 : Number(t);
    setValue('value', Number.isFinite(numeric) ? numeric : 0, { shouldValidate: true });
  }, [setValue]);

  // Handle date change
  const handleDateChange = useCallback((t: string) => {
    setValue('date', t, { shouldValidate: true });
  }, [setValue]);

  // Handle description change
  const handleDescChange = useCallback((v: TransactionDesc) => {
    setValue('desc', v, { shouldValidate: true });
    setValue('type', deriveTypeFromDesc(v), { shouldValidate: true });
  }, [setValue]);

  // Handle file upload
  const handleFileUpload = useCallback(async (file: Blob, fileName: string): Promise<string> => {
    // Store file for later upload after transaction is saved
    setPendingFile(file);
    setPendingFileName(fileName);

    // Return a temporary URL for UI purposes
    return 'pending://' + fileName;
  }, []);

  // Handle file removal
  const handleFileRemove = useCallback(() => {
    if (receiptUrl) {
      // Only delete from storage if this is an existing transaction
      if (transaction?._id && user?._id) {
        deleteReceipt(user._id, transaction._id).catch(console.error);
      }
      clearReceipt();
    }
    setPendingFile(null);
    setPendingFileName(null);
  }, [receiptUrl, transaction, user, deleteReceipt, clearReceipt]);

  // Save transaction
  const handleSave = async (data: TransactionFormData) => {
    if (isSubmitting || isUploading) return;

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

      // Upload receipt after transaction is saved
      if (pendingFile && user?._id) {
        try {
          await uploadReceipt(pendingFile, user._id, saved._id);
        } catch (uploadError) {
          console.error('Failed to upload receipt:', uploadError);
          Alert.alert(
            'Aviso',
            'Transação salva com sucesso, mas houve um problema ao fazer upload do recibo.'
          );
        }
      }

      onSaved(saved);
      handleClose();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a transação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal
  const handleClose = useCallback(() => onClose(), [onClose]);

  // Render segment
  const renderSegment = useCallback(<T extends string>(
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
  }, []);

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
          watchedDesc,
          handleDescChange
        )}

        {renderSegment<TransactionType>(
          'Tipo',
          typeOptions,
          watchedType,
          () => { },
          true
        )}

        <Input
          label="Apelido"
          placeholder="Ex.: Mercado, Uber..."
          value={watchedAlias || ''}
          onChangeText={handleAliasChange}
          error={errors.alias?.message}
        />

        <Input
          label="Valor"
          placeholder="0,00"
          type="number"
          value={Number.isFinite(watchedValue) ? String(watchedValue) : ''}
          onChangeText={handleValueChange}
          error={errors.value?.message}
          icon={dollarIcon}
        />

        <Input
          label="Data"
          placeholder="DD/MM/AAAA"
          type="date"
          value={watchedDate}
          onChangeText={handleDateChange}
          error={errors.date?.message}
          icon={calendarIcon}
        />

        <FileUpload
          label="Recibo/Comprovante"
          value={receiptUrl || (pendingFileName ? `pending://${pendingFileName}` : null)}
          onUpload={handleFileUpload}
          onRemove={handleFileRemove}
          loading={isUploading}
          error={uploadError || undefined}
        />

        <View className={styles.buttonContainer}>
          <Button
            variant="green"
            onPress={handleSubmit(handleSave)}
            loading={isSubmitting || isUploading}
            disabled={isSubmitting || isUploading}
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


