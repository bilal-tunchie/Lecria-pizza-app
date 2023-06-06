"use client"
import { useState } from 'react'

export default function Contact() {

    const [visible, setVisible] = useState(null);

    const qAndAnswers = [
        {
            id: 1,
            question: 'هل احتاج انشئ حساب إلكتروني في ليسيريا عشان اطلب؟',
            answer: `الإجابة : 
            نعم، يتيح لك الاستفادة من برنامج الولاء وحفظ طلباتك السابقة ,و استلام الإشعارات والإستفادة من العروض.`
        },
        {
            id: 2,
            question: 'كيف اطلب ليسيريا بيتزا للتوصيل؟',
            answer: `الإجابة :
            يمكنك الطلب من خلال تطبيق ليسيريا بيتزا أو الموقع .`
        },
        {
            id: 3,
            question: 'هل يوجد حد أدنى للطلب؟',
            answer: `الإجابة :
            لا يوجد حد ادنى للطلب  .`
        },
        {
            id: 4,
            question: 'كم دقيقة ياخذ الطلب ليكون جاهز في ليسيريا بيتزا؟',
            answer: `الإجابة :
            للطلبات أقل من ١٠٠ ريال ، ياخذ الطلب ١٢ دقيقة من الوقت للإعداد. .`
        },
    ]

    return (
        <div className='contact-page'>
            <div className='contact'>
                <h2>تواصل</h2>
                <p>عندك سؤال؟ تواصل مع احد ممثلي خدمة العملاء. وبيكون سعيد بمساعدتك على الرقم : <span>920123456</span></p>
            </div>
            <div className="faq-container">
                <h1>الأسئلة الشائعة</h1>
                {qAndAnswers.map( ({ id, question, answer}) => {
                    return <div 
                        key={id}
                        className="faq" 
                        onClick={ () => setVisible(prev => prev === id ? null : id)}
                    >
                        <div className="question-container fs-20">
                            <h2>{question}</h2>
                            <span className="toggle-btn" >
                                <p>{visible === id ? '-' : '+'}</p>
                            </span>
                        </div>
                        <div className={`answer ${visible === id ? 'visible' : ''}`}>
                            <p>{answer}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
