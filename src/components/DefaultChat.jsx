import DefaultBackground from "../assets/images/bg/2.jpg";

export default function DefaultChat() {
  return (
    <div className="h-[calc(100%-24px)] w-[calc(100%-24px)] m-3 rounded-lg">
      <img 
        src={DefaultBackground} 
        alt="default chat backgound"
        className="h-full w-full drop-shadow-2xl contrast-100 grayscale-[45%] rounded-lg object-cover object-center dark:grayscale" 
      />
    </div>
  )
}
