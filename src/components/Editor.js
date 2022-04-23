import Showdown from 'showdown';
import ReactMde from 'react-mde';
import "react-mde/lib/styles/css/react-mde-all.css";
import { useState } from 'react';

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export default function Editor({ currentNote, updateNote }) {
    const [selectedTab, setSelectedTab] = useState("write");

    return(
        <section className='pane editor'>
            <ReactMde
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) => 
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits='vh'
            />
        </section>
    )
}