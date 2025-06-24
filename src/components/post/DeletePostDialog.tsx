import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actuons/deletePost";

type DeletePostDialogProps = {
  postId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeletePostDialog({
  postId,
  isOpen,
  onOpenChange,
}: DeletePostDialogProps) {
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>記事削除</AlertDialogTitle>
            <AlertDialogDescription>
              記事を削除しますか？
              <br />
              この操作は元に戻せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onOpenChange(false)}>
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePost(postId)}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
