# Receipt Upload Feature

## Overview
The receipt upload feature allows users to attach receipts and documents to their transactions, storing them securely in Firebase Storage using a user-based organization structure.

## Architecture

### Components
1. **FileUpload**: UI component for file selection and upload
2. **ReceiptViewer**: Component for viewing uploaded receipts
3. **useReceiptUpload**: Hook managing upload state and operations

### Services
1. **Firebase Storage Service**: Handles cloud storage operations
   - Upload receipts with user/transaction ID structure
   - Delete receipts by user and transaction ID
   - Get download URLs by user and transaction ID

### Integration Points
- **TransactionModal**: Upload receipts after transaction creation
- **TransactionItem**: Display receipt viewer for transactions with attachments
- **TransactionService**: Delete receipts when removing transactions

## Data Flow

### Upload Process
1. User selects file via document picker
2. File is stored temporarily until transaction is saved
3. After transaction creation, file is uploaded to Firebase Storage
4. File is stored as `{userId}/{transactionId}.{extension}`

### Deletion Process
1. When transaction is deleted, associated receipt is removed from storage
2. Cleanup happens automatically to prevent orphaned files

## Storage Structure
Files are organized in Firebase Storage as:
```
{userId}/
  └── {transactionId}.{extension}
```

## File Restrictions
- Maximum size: 5MB
- Accepted types: PDF, Images (JPEG, PNG, etc.)
- One receipt per transaction
- Files are named using transaction ID for easy identification

## Error Handling
- File size validation
- Upload failure recovery
- Network error handling
- User-friendly error messages
- Graceful degradation if upload fails after transaction save

## Security Considerations
- Files are stored with user-specific paths
- Automatic cleanup prevents storage leaks
- Download URLs are secure and authenticated
- User isolation through path structure
