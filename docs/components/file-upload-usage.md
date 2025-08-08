# FileUpload Component

## Overview
The FileUpload component provides a complete file upload interface with document picker integration, upload progress, and file removal capabilities.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | 'Anexar Recibo' | Label text displayed above the upload area |
| value | string \| null | - | Current file URL (for display purposes) |
| onUpload | (file: Blob, fileName: string) => Promise<string> | required | Async function to handle file upload |
| onRemove | () => void | - | Callback when file is removed |
| accept | string[] | ['application/pdf', 'image/*'] | Accepted file types |
| maxSize | number | 5 | Maximum file size in MB |
| loading | boolean | false | External loading state |
| error | string | - | Error message to display |

## Features
- Document picker integration with Expo
- File size validation
- Upload progress indication
- File removal with confirmation
- Support for PDF and image files
- Responsive design with NativeWind styling

## States
- **Empty**: Shows upload button
- **Uploading**: Shows loading indicator
- **Uploaded**: Shows file name with remove option
- **Error**: Displays error message

## File Types
By default, accepts:
- PDF documents
- All image formats (JPEG, PNG, etc.)

## Integration
Works seamlessly with Firebase Storage service for cloud file storage.
