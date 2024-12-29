import * as AlertDialog from '@radix-ui/react-alert-dialog';

export function Alert({ title, description, onConfirm }: { 
  title: string; 
  description: string; 
  onConfirm: () => void; 
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="bg-blue-500 text-white px-4 py-2 rounded">Show Alert</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/50 fixed inset-0" />
        <AlertDialog.Content className="bg-white p-6 rounded shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-lg font-bold">{title}</AlertDialog.Title>
          <AlertDialog.Description className="text-gray-700 mt-2">{description}</AlertDialog.Description>
          <div className="flex justify-end space-x-2 mt-4">
            <AlertDialog.Cancel className="bg-gray-200 px-4 py-2 rounded">Cancel</AlertDialog.Cancel>
            <AlertDialog.Action onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded">
              Confirm
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
