import { useState } from 'react';
import { useStore } from '../store';
import ReactMarkdown from 'react-markdown';
import { Plus, Trash2, Pin, StickyNote, PenLine, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Notes() {
  const { notes, addNote, updateNote, deleteNote, togglePinNote, themeColor } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(notes.length > 0 ? notes[0].id : null);
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'read'>('split');
  
  const selectedNote = notes.find(n => n.id === selectedId);

  const handleCreateNew = () => {
    addNote({
      content: '# New Protocol\n\nEnter parameters...',
      pinned: false
    });
    // Let it select the newest note on next render.
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full max-w-7xl mx-auto w-full">
      {/* Sidebar list */}
      <div className="w-full md:w-80 bg-black/60 border-4 border-white/20 flex flex-col overflow-hidden shrink-0 relative group h-[40vh] md:h-auto shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b-4 border-white/20 flex items-center justify-between relative z-10 bg-white/5">
          <h2 className="font-[Silkscreen] uppercase tracking-widest text-sm text-white drop-shadow-md">Data Logs</h2>
          <button 
            onClick={handleCreateNew}
            className="w-8 h-8 flex items-center justify-center text-black active:translate-y-px transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:brightness-110 border-2 border-black"
            style={{ backgroundColor: themeColor }}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-2 relative z-10">
          {notes.length === 0 ? (
            <div className="text-center text-white/50 text-xl font-[VT323] uppercase tracking-widest p-4 mt-10">No logs found.</div>
          ) : (
            notes.sort((a,b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.updatedAt - a.updatedAt).map(note => {
              const titleMatch = note.content.split('\n')[0].replace(/^#+\s/, '');
              const title = titleMatch || 'Untitled Log';
              const preview = note.content.split('\n').slice(1).join(' ').substring(0, 40) || 'No content...';
              
              return (
                <div 
                  key={note.id}
                  onClick={() => setSelectedId(note.id)}
                  className={cn(
                    "p-3 cursor-pointer transition-all text-left relative overflow-hidden group/item border-2",
                    selectedId === note.id ? "bg-white/10" : "bg-black/40 border-transparent hover:border-white/10"
                  )}
                  style={selectedId === note.id ? { borderColor: themeColor } : {}}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-[VT323] text-xl truncate text-white tracking-wide">{title}</h3>
                    {note.pinned && <Pin size={12} className="text-white flex-shrink-0 mt-1" style={{ color: themeColor }} />}
                  </div>
                  <p className="text-sm text-white/50 truncate font-[VT323]">{preview}</p>
                  <div className="text-[10px] text-white/40 font-[Silkscreen] mt-2 uppercase tracking-widest">
                    {format(note.updatedAt, 'MMM d, h:mm a')}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Editor / Viewer */}
      <div className="flex-1 bg-black/60 border-4 border-white/20 flex flex-col overflow-hidden relative shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
        <AnimatePresence mode="wait">
          {selectedNote ? (
            <motion.div 
               key={selectedNote.id}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex flex-col h-full relative z-10"
            >
              <div className="h-14 border-b-4 border-white/20 flex items-center justify-between px-4 flex-shrink-0 bg-white/5">
                 <div className="flex items-center gap-4">
                   <button 
                     onClick={() => togglePinNote(selectedNote.id)}
                     className={cn("w-8 h-8 flex items-center justify-center transition-colors border-2", selectedNote.pinned ? "bg-white/10 text-white border-white/20" : "text-white/50 border-transparent hover:text-white hover:bg-white/5")}
                   >
                     <Pin size={16} />
                   </button>
                   
                   {/* Layout Toggles */}
                   <div className="hidden md:flex bg-black/40 p-1 border-2 border-white/10">
                     <button onClick={() => setViewMode('edit')} className={cn("px-3 py-1 text-xs font-[Silkscreen] uppercase tracking-widest transition-all", viewMode === 'edit' ? "bg-white/20 text-white shadow-inner" : "text-white/50 hover:text-white")}>Edit</button>
                     <button onClick={() => setViewMode('split')} className={cn("px-3 py-1 text-xs font-[Silkscreen] uppercase tracking-widest transition-all", viewMode === 'split' ? "bg-white/20 text-white shadow-inner" : "text-white/50 hover:text-white")}>Split</button>
                     <button onClick={() => setViewMode('read')} className={cn("px-3 py-1 text-xs font-[Silkscreen] uppercase tracking-widest transition-all", viewMode === 'read' ? "bg-white/20 text-white shadow-inner" : "text-white/50 hover:text-white")}>Read</button>
                   </div>
                 </div>
                 <button 
                   onClick={() => {
                     deleteNote(selectedNote.id);
                     setSelectedId(null);
                   }}
                   className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-red-400 border-2 border-transparent hover:border-red-400/30 hover:bg-red-400/10 transition-colors"
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
              <div className="flex-1 flex flex-col md:flex-row min-h-0">
                {/* Write Panel */}
                {(viewMode === 'split' || viewMode === 'edit') && (
                  <div className={cn("p-4 md:p-6 bg-black/40 flex-1 overflow-hidden flex flex-col relative", viewMode === 'split' ? "md:border-r-4 border-white/20" : "")}>
                    <div className="text-[10px] font-[Silkscreen] uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2 relative z-10"><PenLine size={12}/> Editor</div>
                    <textarea
                      value={selectedNote.content}
                      onChange={(e) => updateNote(selectedNote.id, e.target.value)}
                      className="w-full flex-1 bg-transparent resize-none outline-none font-[VT323] text-2xl leading-[32px] text-white placeholder:text-white/30 no-scrollbar relative z-10"
                      placeholder="Initialize markdown protocol..."
                      style={{ backgroundAttachment: 'local', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100% 2em' }}
                    />
                  </div>
                )}
                {/* Preview Panel */}
                {(viewMode === 'split' || viewMode === 'read') && (
                  <div className="flex-1 p-4 md:p-6 overflow-y-auto no-scrollbar bg-black/20">
                    <div className="text-[10px] font-[Silkscreen] uppercase tracking-widest text-cyan-400 mb-6 flex items-center gap-2 drop-shadow-md"><Eye size={12}/> Scanner Output</div>
                    <div className="prose prose-invert prose-slate prose-xl max-w-none prose-headings:font-[VT323] prose-headings:tracking-widest prose-a:text-cyan-400 prose-code:bg-white/10 prose-code:text-cyan-300 prose-code:px-1 prose-code:py-0.5 prose-pre:bg-black/60 prose-pre:border-2 prose-pre:border-white/20 prose-p:font-[VT323] prose-p:leading-relaxed prose-li:font-[VT323]">
                      <div className="markdown-body">
                         <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex-1 flex flex-col items-center justify-center text-white/50"
            >
              <div className="w-24 h-24 border-4 border-dashed border-white/20 flex items-center justify-center mb-6 bg-black/40">
                 <StickyNote size={32} className="opacity-50" />
              </div>
              <p className="font-[Silkscreen] text-xs uppercase tracking-widest">Select segment</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
