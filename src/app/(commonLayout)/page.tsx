import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="flex-col justify-center items-center">
         <Button>Click here</Button>
         <div>
          <h2 className="text-2xl font-medium">Hello world</h2>
         </div>
    </div>
  );
}
