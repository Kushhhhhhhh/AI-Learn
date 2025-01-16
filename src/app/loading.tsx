import { Skeleton } from "@/components/ui/skeleton"


const Loading = () => {
  return (
    <div className="bg-black text-white w-full min-h-screen flex justify-center items-center">
      <Skeleton className="w-[800px] h-[600px]" />
    </div>
  )
}

export default Loading