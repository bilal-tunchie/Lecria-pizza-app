import { faPepperHot, faMonument } from '@fortawesome/free-solid-svg-icons'
import { faEnvira } from '@fortawesome/free-brands-svg-icons'
import offer_1  from "@public/images/offer_1.png";
import offer_2  from "@public/images/offer_2.png";
import offer_3  from "@public/images/offer_3.png";

import sauce_r  from "@public/images/sauce_r.png";
import sauce_h  from "@public/images/sauce_h.png";
import sauce_b  from "@public/images/sauce_b.png";
import sauce_d  from "@public/images/sauce_d.png";

const sauces = [
    {
        id: 50,
        name: 'الرانش (+4 ريال)',
        quantity: 0,
        price: 4,
        img: sauce_r
    },
    {
        id: 51,
        name: 'الحراق (+4 ريال)',
        quantity: 0,
        price: 4,
        img: sauce_h
    },
    {
        id: 52,
        name: 'الباربكيو (+4 ريال)',
        quantity: 0,
        price: 4,
        img: sauce_b
    },
    {
        id: 53,
        name: 'صوص الداينمايت (+4 ريال)',
        quantity: 0,
        price: 4,
        img: sauce_d
    },
]

export const menuData = [
    {
        id: 1,
        name: "بيانو",
        price: 99,
        description: "ثلاث أنواع بيتزا من اختيارك مع نوعين صوص",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/NPPL.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [ 
            { 
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }
        ],
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 2,
        name: "بيستو زيت الزيتون",
        price: 39,
        description: "صلصة بيستو زيت الزيتون، خلطة الجبنة، الدجاج المشوي، الطماطم الكرزية الطازجة",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/OOP.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [ 
            { 
                flavour: faMonument,
                color: '#e27e01'
            },
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 3,
        name: "خضار مشويّة",
        price: 39,
        description: "صلصة الطماطم، خلطة الجبنة، بصل مكرمل، فلفل أحمر وأخضر بارد، بطاطا حلوة، باذنجان، كوسة، فطر",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/ROV.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [ 
            { 
                flavour: faMonument,
                color: '#e27e01'
            },
            { 
                flavour: faEnvira,
                color: '#1d821b'
            },
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 4,
        name: "فاهيتا الدجاج",
        price: 39,
        description: "صلصة الطماطم، دجاج مبهر، خلطة الجبنة الفاخرة، فلفل أخضر، فلفل أحمر، هلابينو، بصل، صوص الفاهيتا الخاص",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/CHF.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [ 
            { 
                flavour: faMonument,
                color: '#e27e01'
            },
            { 
                flavour: faPepperHot,
                color: '#e43d2f'
            },
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 5,
        name: "دجاج الفريدو",
        price: 39,
        description: "صلصلة ألفريدو، خلطة الجبنة، الدجاج المشوي، الفطر الأسباني",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/ACH.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [ 
            { 
                flavour: faMonument,
                color: '#e27e01'
            }
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 6,
        name: "سوبرانو بيتز",
        price: 39,
        description: "خلطة الجبنة، فيلي ستيك، فلفل أخضر، قطع الفطر البنيّ، بصل، خلطة الجبنة السرية",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/SOP.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [ 
            { 
                flavour: faMonument,
                color: '#e27e01'
            }
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 7,
        name: "مارغريتا بوراتا",
        price: 39,
        description: "صلصة مايسترو، خلطة جبنة مايسترو السرية، جبنة البوراتا، وصلصة البيستو",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/BUM.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 8,
        name: "رانشي الأصلية مع هالابينو",
        price: 39,
        description: "صلصة البيتزا البيضاء، خلطة الجبنة، هلابينو، دجاج مشوي، صلصة الرانش",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/CHR.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [ 
            { 
                flavour: faPepperHot,
                color: '#e43d2f'
            },
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 9,
        name: "رانشي الأصلية بدون هالابينو",
        price: 39,
        description: "صلصة البيتزا البيضاء، خلطة الجبنة، دجاج مشوي، صلصة الرانش",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/CHRJ.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 10,
        name: "رانشي باربكيو",
        price: 39,
        description: "صلصة الرانش، خلطة الجبنة، بصل، دجاج مشوي، صلصة الباربكيو",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/RBQ.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 11,
        name: "رانشي بيبروني",
        price: 39,
        description: "صلصة الطماطم، جبنة موزاريلا ، رشّة زعتر برّي، قطع البيبروني، صوص الرانشي",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/RP.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [ 
            { 
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 12,
        name: "رانشي ديناميت",
        price: 39,
        description: "جبنة موزريلا ، رشّة زعتر برّي، شرائح بصل، فلفل أخضر، قطع من دجاج الكيكرز، صوص الديناميت مع الرانشي",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/RD.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [ 
            {
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 13,
        name: "مارغريتا",
        price: 39,
        description: "صلصة مايسترو، خلطة جبنة مايسترو السرية",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/MA.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [ 
            { 
                flavour: faEnvira,
                color: '#1d821b'
            },
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 14,
        name: "فيجيتاريان",
        price: 39,
        description: "صلصة مايسترو، خلطة الجبنة، زيتون، بصل، طماطم، فلفل أخضر، فطر",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/VE.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [ 
            { 
                flavour: faEnvira,
                color: '#1d821b'
            },
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 15,
        name: "بيتزا الروكا",
        price: 39,
        description: "جرجير , جبنة بارميزان , خل البلسمك, خلطة الجبنة, طماطم",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FIR.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [ 
            {
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }, 
            { 
                flavour: faEnvira,
                color: '#1d821b'
            }, 
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 16,
        name: "رانشي الأصلية بدون هالابينو",
        price: 39,
        description: "صلصة البيتزا البيضاء, خلطة الجبنة, دجاج مشوي, صلصة الرانش (97 كالوري)",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/CHRJ.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 17,
        name: "دجاج شيبوتلي",
        price: 39,
        description: "صلصة طماطم، خلطة الجبن، شرائح جبنة بيضاء، فلفل أخضر، فلفل أحمر، بصل، دجاج مشوي، صلصة شيبوتلي",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/055.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [ 
            {
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 18,
        name: "دجاج البفلو",
        price: 39,
        description: "صلصة البيتزا البيضاء، خلطة الجبنة، دجاج البافلو، صلصة البافلو",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/CBF.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [ 
            { 
                flavour: faPepperHot,
                color: '#e43d2f'
            },
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 19,
        name: "دجاج مشوي",
        price: 39,
        description: "صلصة مايسترو، خلطة الجبنة، دجاج مشوي، زيتون، بصل، طماطم، ، فطر",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/CH.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 20,
        name: "بيبروني",
        price: 39,
        description: "صلصة مايسترو، خلطة الجبنة، بيبروني",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/PE.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 21,
        name: "عشاق اللحم",
        price: 39,
        description: "صلصة مايسترو، خلطة الجبنة، لحم، بيبروني",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/ML.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 22,
        name: "التاكو دجاج",
        price: 39,
        description: "صلصة مايسترو، خلطة الجبنة، دجاج، فلفل أخضر، بصل، زيتون، طماطم، ناتشوز، صلصة جبنة التشيدر",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/TCH.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 23,
        name: "ديلوكس",
        price: 39,
        description: "صلصة مايسترو، خلطة الجبنة، لحم، بيبروني، زيتون، بصل، فلفل أخضر، فطر",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/DE.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 24,
        name: "دجاج الباربكيو",
        price: 39,
        description: "صلصة مايسترو، خلطة الجبنة، بصل، دجاج مشوي، صلصة الباربكيو",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/CB.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 25,
        name: "ستيك وجبنة",
        price: 39,
        description: "خلطة الجبنة، فيلي ستيك، فلفل أخضر، فطر، بصل، خلطة الجبنة السرية",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/SC.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 26,
        name: "دينمايت دجاج",
        price: 39,
        description: "بصل، فلفل أخضر، خلطة الجبنة، دجاج البفلو، خلطة الجبنة السرية، صوص الداينمايتدينمايت دجاج",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/GEL.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [ 
            {
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }
        ],
        size: "كبيرة",
        dough: {name: 'سميكة', price: 0},
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 27,
        name: "بيتزا الأطفال",
        price: 18,
        description: "بيتزا صغيرة بحجم مناسب للأطفال مع لعبة هدية",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/NKMKM.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [] ,
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 28,
        name: "موزريلا رول",
        price: 18,
        description: "فطيرة قطنيّة محشيّة بجبنة الموزريلا الأصلية، منكّهة بطعم الأوريجانو ونكهة الثوم اللذيذ",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/SFSDF0027.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [ 
            {
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }
        ] ,
        favorite: false,
        sauces: sauces,
        quantity : 1
    },
    {
        id: 29,
        name: "لودد رانشي ودجز",
        price: 15,
        description: "بطاطس ودجز مع قطع الدجاج بجبنة الموزاريلا وصوص الرانش",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGAPT0018.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [ 
            {
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }
        ],
        favorite: false,
        sauces: sauces,
        quantity : 1  
    },
    {
        id: 30,
        name: "بوكس حفلة الدجاج",
        price: 29,
        description: "نوعين من قطع الدجاج الرهيبة! ٦ قطع من دجاج سبايسي و ٦ قطع من دجاج بفلو. تقدم مع صوص",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGCMA8008.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [ 
            {
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }
        ],
        favorite: false,
        sauces: sauces,
        quantity : 1  
    },
    {
        id: 31,
        name: "بركان الناتشوز",
        price: 23,
        description: "جبنة الشيدر الذائبة تقدم مع رقائق الناتشوز المقرمشة. مثالي للمشاركة",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGAPT2015.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [],
        favorite: false,
        sauces: sauces,
        quantity : 1  
    },
    {
        id: 32,
        name: "بطاطس سمايلز",
        price: 11,
        description: "قطع من بطاطس سمايلي اللذيذة للأطفال",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGAPT2027.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        favorite: false,
        sauces: sauces,
        quantity : 1   
    },
    {
        id: 33,
        name: "كاساديا",
        price: 23,
        description: "مزيج من قطع الدجاج المشوي بداخل التورتيلا المحمصة",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGAPT2037.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [],
        favorite: false,
        sauces: sauces,
        quantity : 1 
    },
    {
        id: 34,
        name: "أجنحة الدجاج",
        price: 24,
        description: "اجنحة الدجاج المتبلة ، تققدم مع صوص الرانش",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGAPT2035.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        favorite: false,
        sauces: sauces,
        quantity : 1  
    },
    {
        id: 35,
        name: "بطاطس ودجز",
        price: 11,
        description: "شرائح البطاطا الذهيبة المقرمشة متبلة بالبهارات",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGAPT2036.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [],
        favorite: false,
        sauces: sauces,
        quantity : 1  
    },
    {
        id: 36,
        name: "دجاج بالنكهة المولعة",
        price: 15,
        description: "قطع الدجاج المولعة تقدم مع صلصة الرانش",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGAPT2034.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [],
        favorite: false,
        sauces: sauces,
        quantity : 1  
    },
    {
        id: 37,
        name: "شوكو بيتزا",
        price: 23,
        description: "بيتزا مغطاة بالشوكولاتة الشهية والبسكويت المقرمش",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGPZT2044.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [ 
            {
                flavour: 'NEW',
                color: 'var(--color-light-shade)'
            }
        ],
        favorite: false,
        quantity : 1 
    },
    {
        id: 38,
        name: "تشوروز بالشوكولاتة",
        price: 16,
        description: "التشوروز الأصليّة المقرمشة برشات السكر مع صوص الشوكولاتة اللذيذة",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGDST1003.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [],
        favorite: false, 
        quantity : 1  
    },
    {
        id: 39,
        name: "لافا",
        price: 10,
        description: "لافا",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/LVLV.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        favorite: false,
        quantity : 1   
    },
    {
        id: 40,
        name: "كوكا كولا - ٣٣٠ م ل",
        price: 4,
        description: "",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/CC.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [],
        favorite: false, 
        quantity : 1  
    },
    {
        id: 41,
        name: "كوكا كولا لايت - 330 م ل",
        price: 4,
        description: "",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGBET1022.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        favorite: false, 
        quantity : 1  
    },
    {
        id: 42,
        name: "سبرايت - 330 م ل",
        price: 4,
        description: "",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/SP.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [],
        favorite: false, 
        quantity : 1  
    },
    {
        id: 43,
        name: "فانتا اورانج - 330 م ل",
        price: 4,
        description: "",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGBET1025.png",
        backgroundColor: 'var(--color-tertiary)',
        flavours: [],
        favorite: false,
        quantity : 1   
    },
    {
        id: 44,
        name: "مياه اروى - 500 م ل",
        price: 2,
        description: "",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGBET1026.png",
        backgroundColor: 'var(--color-secondary-tint)',
        flavours: [],
        favorite: false,
        quantity : 1   
    },
    {
        id: 45,
        name: "فانتا حمضيات - 330 م ل",
        price: 4,
        description: "",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGBET1028.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [],
        favorite: false,
        quantity : 1   
    },
    {
        id: 46,
        name: "حليب شوكولاتة",
        price: 3,
        description: "",
        img: "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/FGBVT0008.png",
        backgroundColor: 'var(--color-primary)',
        flavours: [],
        favorite: false,  
        quantity : 1 
    },
]

export const offerData = [
    {
        id: 47,
        name: "تقفيلة الجوع",
        price: 109,
        description: "خذ البيانو مع خمسة علب كوكاكولا",
        img: offer_1, 
        favorite: false,
        sauces: sauces,
        quantity : 1,
        type: 'offer',
        backgroundColor: 'var(--color-primary)',
    },
    {
        id: 48,
        name: "بيانو بيتزا",
        price: 99,
        description: "ثلاثة أنواع بيتزا مع تغميتين من اختيارك بـ 99 ريال",
        img: offer_2,
        favorite: false,
        sauces: sauces,
        quantity : 1,
        type: 'offer',
        backgroundColor: 'var(--color-primary)',
    },
    {
        id: 49,
        name: "موزريلا رول",
        price: 18,
        description: "محشية بجبنة الموزريلا الاصلية بـ 18 ريال",
        img: offer_3,
        favorite: false,
        sauces: sauces,
        quantity : 1,
        type: 'offer',
        backgroundColor: 'var(--color-primary)', 
    },
]


export const profile = {
    card : {
        card_bank: 'Mada XXXXXXXXXXXX4567',
        card_name: 'MOHAMED KHALED FAISAL',
        card_number: 1234567891234567,
        CVC: 123,
        card_expiry: {
            month: 9,
            year: 28
        }
    },
    details : [ 
        { id: 1, que: 'الاسم', ans: 'محمد خالد فيصل'},
        { id: 2, que: 'رقم الجوال', ans: ''},
        { id: 3, que: 'البريد الالكتروني', ans: ''},
        { id: 4, que: 'تاريخ الميلاد', ans: '1999-12-31'},
    ],
    otherDetails : [
        { id: 5, que: 'اشترك وتجيك آخر العروض', ans: true},
        { id: 6, que: 'لغة التطبيق', ans: 'العربية'},
        { id: 7, que: 'لغة التواصل', ans: 'العربية'},
        { id: 8, que: 'بطاقات الائتمانية', ans: ''},
    ]
}

profile.otherDetails[3].ans = profile.card.card_bank;