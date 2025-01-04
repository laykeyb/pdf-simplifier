import { difficultyLevelAtom } from "@/atoms/simplify-atoms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import { useEffect } from "react";
const DifficultyLevelSlider = ({isDisabled = false}) => {
  const [difficultyLevel, setDifficultyLevel] = useAtom(difficultyLevelAtom);
useEffect(()=> {
    console.log(difficultyLevel);
    
},[difficultyLevel])
  return (
    <Select disabled={isDisabled} value={difficultyLevel.toString()} onValueChange={(val) => {
        if (val) {
          setDifficultyLevel(parseInt(val));
        }
      }} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="-20">Easiest</SelectItem>
        <SelectItem value="-40">Level 1</SelectItem>
        <SelectItem value="-60">Level 2</SelectItem>
        <SelectItem value="-80">Level 3</SelectItem>
        <SelectItem value="-100">Hardest</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default DifficultyLevelSlider;
