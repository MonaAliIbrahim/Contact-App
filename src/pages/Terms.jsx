import { Card, Typography } from "@material-tailwind/react";
import ParticlesComponent from "../shared/Components/Particles/Particles";

export default function Terms() {
  return (
    <div className="flex justify-center min-h-[100vh] w-full bg-gray-100">
      <Card className="container z-10 my-14 mx-6 bg-secondary text-gray-900 opacity-90">
        <article className="min-h-[calc(100vh-64px)] mb-6 p-10 md:p-14">
          <Typography  
            variant="h2" color="red" 
            className="!font-familyExtraBold my-8 text-center text-6xl brightness-75">
            Terms of Service
          </Typography>
          <Typography variant="paragraph" className="!font-familyNormal max-w-10/12 text-lg leading-loose py-8">
            Let's Contact terms of service govern your access to and use of the website, inbox solution, and the white label and enterprise solutions. 
            By placing this “Order”, the Client requests to use the WhatsApp Business Solution services provided by get.chat Sp. z o.o. Zarajec Potocki 31, 23-313 Potok Wielki, Poland acting as an authorized “Solution Provider”.
            The “Services” means all services provided by get.chat in connection with the setting up, the technical integration of WhatsApp Business Account.  
            This Order including its annexes shall be referred to as the “Agreement”. <br/>
            By placing this Order, Customer authorizes get.chat to request Client WABA(s) from Business Service Provider(s) (“BSP(s)”) and to administrate the Inbox(es) on behalf of Client. 
            This shall include the passing on of information between WhatsApp and Customer for the purposes of this Agreement.
          </Typography>
          <ul className="list-disc">
            <li className="!font-familyExtraBold mb-3 text-lg marker:animate-pulse text-red-800">
              Scope of Services
              <ul className="!font-familyNormal list-inside list-decimal mt-2 mb-6 leading-7 text-gray-900">
                <li className="mb-1 hover:ml-2 ease-in duration-300 marker:text-red-900 marker:animate-none">
                  Let's Contact grants Customer the right to use get.chat’s Services for the purposes of this Agreement.
                </li>
                <li className="hover:ml-2 ease-in duration-300 marker:text-red-900 marker:animate-none">
                  Let's Contact has no influence over the WhatsApp network and the services provided by WhatsApp.
                  Therefore, get.chat assumes no liability regarding the operations, availability, 
                  and available features of the WhatsApp Network and the WhatsApp Business Services.
                </li>
              </ul>
            </li>
            <li className="!font-familyExtraBold mb-3 text-lg marker:animate-pulse text-red-800">
              Prices and Billing
              <ul className="!font-familyNormal list-inside list-decimal mt-2 mb-6 leading-7 text-gray-900">
                <li className="hover:ml-2 ease-in duration-300 marker:text-red-900 marker:animate-none">
                  get.chat reserves the right to adjust the prices to cover increased or decreased staff costs and other operational costs, 
                  if reasonable not more than once per year. Such increases will be announced with at least six-weeks’ notice in writing or text form. 
                  If Customer does not agree with a fee adjustment, Customer may terminate the Agreement to the day of the increased prices becoming effective
                </li>
              </ul>
            </li>
          </ul>
        </article>
      </Card>
      <ParticlesComponent />
    </div>
  )
}
