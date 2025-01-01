"use client";
import { historyAtom } from "@/atoms/simplify-atoms";
import { useAtom } from "jotai";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import HistoryComponentsFromText from "./history-components-from-text";

const HistoryDisplay = () => {
  const [history] = useAtom(historyAtom);
  if (!history.length) {
    return <div>Nothing here but crickets</div>;
  }
  return history.map((hist, index) => {
    return <div className="flex flex-row mb-8" key={index}>
        <div className="truncate">{hist.join("").toString()}</div>
        <Dialog>
          <DialogTrigger > <Button variant="purple">Go to</Button></DialogTrigger>
          <DialogContent >
            <HistoryComponentsFromText simplifiedWordsArray={hist}/>
          </DialogContent>
        </Dialog>
    </div>;
  });
};
export default HistoryDisplay;
