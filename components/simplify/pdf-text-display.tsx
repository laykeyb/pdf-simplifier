import { UseAiSwitch } from "./use-ai-switch";
import { SimplifiedPdfViewerControls } from "./simplified-pdf-viewer-controls";
import {
  extractedTextAtom,
  isExtractingAtom,
  simplifyAtom,
  useAiAtom,
} from "@/atoms/simplify-atoms";
import { useAtom } from "jotai";

import { BeatLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SequentialTextChunker from "./sequential-text-chunker";
import DifficultyLevelSlider from "./difficult-level-slider";
import { ChevronDown } from "lucide-react";

const PdfTextDisplay = () => {
  const [extractedText] = useAtom(extractedTextAtom);
  const [isExtracting] = useAtom(isExtractingAtom);
  const [simplify, setSimplify] = useAtom(simplifyAtom);

  // Set state for meaning

  const handleSimplify = () => {
    setSimplify(true);
  };

  if (isExtracting) {
    return (
      <div className="flex w-full justify-center">
        <BeatLoader />
      </div>
    );
  }
  if (!extractedText) {
    return;
  }

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Extracted Text</h3>
      <div className=" h-96 w-full  overflow-y-scroll rounded border bg-yellow-200 p-2 dark:bg-black">
        {extractedText && simplify ? (
          <SequentialTextChunker text={extractedText} wordsPerChunk={100} />
        ) : (
          <div>{extractedText}</div>
        )}
      </div>

      {simplify ? (
        <SimplifiedPdfViewerControls />
      ) : (
        <div className=" mt-4">
          <Button onClick={handleSimplify} variant="purple"  disabled={simplify} >
            Simplify
          </Button>
          <Collapsible >
            <CollapsibleTrigger className="flex gap-2 bg-[#D7B1FE] px-4 py-2">
              <span>Options</span> <ChevronDown />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-[#D7B1FE] w-fit p-4">
              <div className="mb-4">
                <UseAiSwitch simplify={simplify} />
              </div>
              <DifficultyLevelSlider isDisabled={simplify} />
            </CollapsibleContent>
          </Collapsible>
          
        </div>
      )}
    </div>
  );
};
export default PdfTextDisplay;
