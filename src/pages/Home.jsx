import ContactList from '../components/ContactList';
import Chat from '../components/Chat';

export default function Home() {
  return (
    <div className="grid grid-cols-12 h-full max-h-full min-w-[650px]">
      <div 
        className="col-span-5 lg:col-span-4 xl:col-span-3 overflow-y-auto">
        <ContactList/>
      </div>
      <div 
        className="col-span-7 lg:col-span-8 xl:col-span-9 overflow-y-auto">
        <Chat/>
      </div>
    </div>
  )
}
