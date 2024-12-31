import { Input } from "@/components/ui/input"
import { useAtom } from "jotai";
import {  extractedTextAtom, isExtractingAtom, simplifyAtom } from "@/atoms/simplify-atoms";
import { extractPDFText } from "@/lib/extract";
import { toast } from "@/hooks/use-toast";
import PdfTextDisplay from "@/components/simplify/pdf-text-display";

const PdfExtractor = () => {
  const [extractedText, setExtractedText] = useAtom(extractedTextAtom);
  const [isExtracting, setIsExtracting] = useAtom(isExtractingAtom);
  const [simplify, setSimplify] = useAtom(simplifyAtom)


  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSimplify(false)
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      //   setFile(selectedFile);
      setIsExtracting(true);
      try {
        const extractedText = await extractPDFText(selectedFile);
        if (extractedText) {
          if (extractedText.error) {
            toast({
              title: "Error",
              description: "Could not extract text from PDF",
              variant: "destructive",
            });
          }
          if (extractedText.success) {
            //TODO: toast success  message
            setExtractedText(extractedText.success);
          }
        }
      } catch (error) {
        console.error("File upload error:", error);
      }
      setIsExtracting(false);
  
    }
  };

  return (
    <div >
  
      <Input
      id="files"
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        disabled={isExtracting}
        className="bg-[#9237EE]   border-0 mb-8 text-[#D7B1FE] "
      />

    <PdfTextDisplay/>
    </div>
  );
};
export default PdfExtractor;
