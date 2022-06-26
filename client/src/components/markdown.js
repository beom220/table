import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";


export default function ShowMarkDown({children}) {
    return (
        <div className="js-markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]} children={children}/>
        </div>
    )
}