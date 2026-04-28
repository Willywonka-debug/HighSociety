import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export const PRODUCTS = [
  {
    id: "p1",
    name: "Blue Dream  ",
    brand: "CannaFarms",
    category: "Flower",
    price: 2800,
    thc: "21%",
    cbd: "0.1%",
    type: "Sativa-Dominant Hybrid",
    rating: 4.8,
    reviews: 342,
    image: "https://budexpressnow.co/wp-content/uploads/2022/10/BLUEDREAM-BXN.jpg",
    images: [
      "https://budexpressnow.co/wp-content/uploads/2022/10/BLUEDREAM-BXN.jpg",
      "https://picsum.photos/seed/prod_1_1/800/800",
      "https://picsum.photos/seed/prod_1_2/800/800",
      "https://picsum.photos/seed/prod_1_3/800/800"
    ],
    description: "Blue Dream, a sativa-dominant hybrid originating in California, has achieved legendary status among West Coast strains. Crossing Blueberry with Haze, Blue Dream balances full-body relaxation with gentle cerebral invigoration.",
    effects: [
      {
        name: "Happy",
        val: 85
      },
      {
        name: "Relaxed",
        val: 75
      },
      {
        name: "Euphoric",
        val: 70
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 80
      },
      {
        name: "Depression",
        val: 75
      },
      {
        name: "Pain",
        val: 65
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 90
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Paranoid",
        val: 15
      }
    ]
  },
  {
    id: "p2",
    name: "TINY",
    brand: "TINY",
    category: "Vapes",
    price: 1100,
    thc: "80-95%",
    cbd: "0-2%",
    type: "Hybrid",
    rating: 4.6,
    reviews: 89,
    image: "https://tymber-blaze-products.imgix.net/TINY-2-GRAM-DISPO-HEAVENLY-KING-w-116083c1-1fb8-47ee-b97f-7261b4c7b0d1.jpg",
    images: [
      "https://tymber-blaze-products.imgix.net/TINY-2-GRAM-DISPO-HEAVENLY-KING-w-116083c1-1fb8-47ee-b97f-7261b4c7b0d1.jpg",
      "https://picsum.photos/seed/prod_2_1/800/800",
      "https://picsum.photos/seed/prod_2_2/800/800",
      "https://picsum.photos/seed/prod_2_3/800/800"
    ],
    description: "TINY 2G Disposables are engineered for maximum discretion without sacrificing potency. These compact vapes are packed with premium distillate and natural terpenes, delivering smooth, flavor-rich hits that provide a long-lasting and balanced high.",
    effects: [
      {
        name: "Focused",
        val: 85
      },
      {
        name: "Happy",
        val: 80
      },
      {
        name: "Relaxed",
        val: 75
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 85
      },
      {
        name: "ADHD",
        val: 70
      },
      {
        name: "Anxiety",
        val: 65
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 80
      },
      {
        name: "Dry Eyes",
        val: 50
      },
      {
        name: "Dizzy",
        val: 15
      }
    ]
  },
  {
    id: "p3",
    name: "Galactic Grape",
    brand: "FRYD",
    category: "Vapes",
    price: 2750,
    thc: "80-95%",
    cbd: "0-2%",
    type: "Sativa",
    rating: 4.9,
    reviews: 210,
    image: "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/91e37a7e7159bf5d6072f9464eabbd8d.jpeg?width=1104&height=1104",
    images: [
      "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/91e37a7e7159bf5d6072f9464eabbd8d.jpeg?width=1104&height=1104",
      "https://picsum.photos/seed/prod_3_1/800/800",
      "https://picsum.photos/seed/prod_3_2/800/800",
      "https://picsum.photos/seed/prod_3_3/800/800"
    ],
    description: "Galactic Grape by FRYD is an out-of-this-world live resin experience. Bursting with sweet, syrup-like grape flavor, this potent vape provides a heavy-hitting euphoria that launches you into a state of deep, cosmic relaxation.",
    effects: [
      {
        name: "Euphoric",
        val: 92
      },
      {
        name: "Relaxed",
        val: 88
      },
      {
        name: "Happy",
        val: 80
      }
    ],
    medical: [
      {
        name: "Pain",
        val: 85
      },
      {
        name: "Stress",
        val: 85
      },
      {
        name: "Insomnia",
        val: 80
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Drowsy",
        val: 70
      }
    ]
  },
  {
    id: "p4",
    name: "Asteroid Berry",
    brand: "FRYD",
    category: "Vapes",
    price: 2750,
    thc: "80-95%",
    cbd: "0-2%",
    type: "Indica",
    rating: 4.5,
    reviews: 415,
    image: "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/16993771b7bb156d83641d120f79bab8.jpeg?width=552&height=552",
    images: [
      "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/16993771b7bb156d83641d120f79bab8.jpeg?width=552&height=552",
      "https://picsum.photos/seed/prod_4_1/800/800",
      "https://picsum.photos/seed/prod_4_2/800/800",
      "https://picsum.photos/seed/prod_4_3/800/800"
    ],
    description: "Asteroid Berry from FRYD is a celestial blend of mixed berries with a subtle, dank undertone. This smooth-hitting live resin is celebrated for its ability to clear the mind while grounding the body in profound tranquility.",
    effects: [
      {
        name: "Clear-headed",
        val: 85
      },
      {
        name: "Relaxed",
        val: 90
      },
      {
        name: "Happy",
        val: 85
      }
    ],
    medical: [
      {
        name: "Anxiety",
        val: 85
      },
      {
        name: "Pain",
        val: 80
      },
      {
        name: "Nausea",
        val: 75
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 80
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Dizzy",
        val: 10
      }
    ]
  },
  {
    id: "p5",
    name: "Lemon Tree (Gummies)",
    brand: "Faded Fruit",
    category: "Edibles",
    price: 3300,
    thc: "50mg per piece (varies)",
    cbd: "0-5mg",
    type: "Sativa",
    rating: 4.7,
    reviews: 156,
    image: "https://fadedfruitsgummiess.com/wp-content/uploads/2025/09/FADED-FRUITS-GUMMIES-500MG-LEMON-TREE-FRONT-2048x1536-1-768x576-1.jpg",
    images: [
      "https://fadedfruitsgummiess.com/wp-content/uploads/2025/09/FADED-FRUITS-GUMMIES-500MG-LEMON-TREE-FRONT-2048x1536-1-768x576-1.jpg",
      "https://picsum.photos/seed/prod_5_1/800/800",
      "https://picsum.photos/seed/prod_5_2/800/800",
      "https://picsum.photos/seed/prod_5_3/800/800"
    ],
    description: "Faded Fruit Lemon Tree gummies are zesty, citrus-infused edibles that offer a bright burst of lemon flavor. These gummies are perfect for social settings or creative endeavors, providing a clear-headed high that elevates mood and sparks conversation.",
    effects: [
      {
        name: "Talkative",
        val: 85
      },
      {
        name: "Happy",
        val: 90
      },
      {
        name: "Energetic",
        val: 80
      }
    ],
    medical: [
      {
        name: "Fatigue",
        val: 85
      },
      {
        name: "Depression",
        val: 80
      },
      {
        name: "Social Anxiety",
        val: 75
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 70
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Paranoid",
        val: 10
      }
    ]
  },
  {
    id: "p6",
    name: "Baby Jeeter Rosin Enhanced Diamonds Milk Man",
    brand: "Jeeter",
    category: "Flower",
    price: 1375,
    thc: "35-41%",
    cbd: "0-1%",
    type: "Hybrid",
    rating: 4.4,
    reviews: 67,
    image: "https://tymber-blaze-products.imgix.net/Baby-Jeeter-Milk-Man-Rosin-Diamonds-5582cf7c-b745-4e79-a96a-c92aa1712117.PNG",
    images: [
      "https://tymber-blaze-products.imgix.net/Baby-Jeeter-Milk-Man-Rosin-Diamonds-5582cf7c-b745-4e79-a96a-c92aa1712117.PNG",
      "https://picsum.photos/seed/prod_6_1/800/800",
      "https://picsum.photos/seed/prod_6_2/800/800",
      "https://picsum.photos/seed/prod_6_3/800/800"
    ],
    description: "Baby Jeeter Milk Man pre-rolls are quad-infused with liquid diamonds and live rosin for an explosive high. This creamy hybrid strain is perfect for users seeking a smooth, dessert-like smoke with a powerful punch in a small package.",
    effects: [
      {
        name: "Happy",
        val: 90
      },
      {
        name: "Relaxed",
        val: 85
      },
      {
        name: "Uplifted",
        val: 80
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 85
      },
      {
        name: "Depression",
        val: 80
      },
      {
        name: "Pain",
        val: 75
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Anxious",
        val: 50
      }
    ]
  },
  {
    id: "p7",
    name: "Baby Jeeter Rosin Enhanced Diamonds Acapulco Gold",
    brand: "Jeeter",
    category: "Flower",
    price: 1210,
    thc: "35-45%",
    cbd: "0-1mg",
    type: "Sativa",
    rating: 4.8,
    reviews: 124,
    image: "https://tymber-blaze-products.imgix.net/Baby-Jeeter-Acapulco-Gold-Rosin-Diamonds-0db600aa-f15e-45f8-8a2f-1a2c129f1c2c.PNG",
    images: [
      "https://tymber-blaze-products.imgix.net/Baby-Jeeter-Acapulco-Gold-Rosin-Diamonds-0db600aa-f15e-45f8-8a2f-1a2c129f1c2c.PNG",
      "https://picsum.photos/seed/prod_7_1/800/800",
      "https://picsum.photos/seed/prod_7_2/800/800",
      "https://picsum.photos/seed/prod_7_3/800/800"
    ],
    description: "Baby Jeeter Rosin Enhanced Diamonds Acapulco Gold is a premium quad-infused pre-roll pack featuring five mini joints packed with potent flower, liquid diamonds, live rosin, and kief. This classic sativa strain delivers smooth, flavorful hits with tropical sweetness and a strong, energizing high—perfect for daytime use and active sessions.",
    effects: [
      {
        name: "Energetic",
        val: 90
      },
      {
        name: "Happy",
        val: 88
      },
      {
        name: "Focused",
        val: 85
      }
    ],
    medical: [
      {
        name: "Depression",
        val: 80
      },
      {
        name: "Fatigue",
        val: 85
      },
      {
        name: "Stress",
        val: 85
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 60
      },
      {
        name: "Groggy",
        val: 40
      },
      {
        name: "Dizzy",
        val: 15
      }
    ]
  },
  {
    id: "p8",
    name: "Strawberry Supernova",
    brand: "FRYD",
    category: "Vapes",
    price: 2475,
    thc: "80-95%",
    cbd: "0-2%",
    type: "Sativa",
    rating: 4.6,
    reviews: 289,
    image: "https://frydflavors.com/wp-content/uploads/2025/07/FRYD_DUAL_PACK_DISPOSABLE_RECHARGEABLE_VAPE_CART_GUMMIES_LIQUID_BATTER_LIVE_RESIN_3_G_STRAWBERRY_SUPER_NOV_Auntitled_9_76ff90e731.webp",
    images: [
      "https://frydflavors.com/wp-content/uploads/2025/07/FRYD_DUAL_PACK_DISPOSABLE_RECHARGEABLE_VAPE_CART_GUMMIES_LIQUID_BATTER_LIVE_RESIN_3_G_STRAWBERRY_SUPER_NOV_Auntitled_9_76ff90e731.webp",
      "https://picsum.photos/seed/prod_8_1/800/800",
      "https://picsum.photos/seed/prod_8_2/800/800",
      "https://picsum.photos/seed/prod_8_3/800/800"
    ],
    description: "Strawberry Supernova by FRYD is a high-octane live resin that explodes with sweet, sun-ripened strawberry flavor. This sativa-dominant blend is designed to power you through your day, providing a massive energy boost and a joyous, creative headspace.",
    effects: [
      {
        name: "Energetic",
        val: 95
      },
      {
        name: "Happy",
        val: 90
      },
      {
        name: "Creative",
        val: 85
      }
    ],
    medical: [
      {
        name: "Fatigue",
        val: 90
      },
      {
        name: "Stress",
        val: 85
      },
      {
        name: "Depression",
        val: 80
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 80
      },
      {
        name: "Anxious",
        val: 45
      },
      {
        name: "Dry Eyes",
        val: 50
      }
    ]
  },
  {
    id: "p9",
    name: "Strawberry Cough (Gummies)  ",
    brand: "Faded Fruits",
    category: "Edibles",
    price: 1925,
    thc: "50mg per piece (varies)",
    cbd: "0-5%",
    type: "Sativa",
    rating: 4.9,
    reviews: 312,
    image: "https://fadedfruitofficial.com/wp-content/uploads/2025/12/FADED-FRUITS-GUMMIES-500MG-STRAWBERRY-COUGH-FRONT-2048x1536-1.jpg",
    images: [
      "https://fadedfruitofficial.com/wp-content/uploads/2025/12/FADED-FRUITS-GUMMIES-500MG-STRAWBERRY-COUGH-FRONT-2048x1536-1.jpg",
      "https://picsum.photos/seed/prod_9_1/800/800",
      "https://picsum.photos/seed/prod_9_2/800/800",
      "https://picsum.photos/seed/prod_9_3/800/800"
    ],
    description: "Faded Fruits Strawberry Cough gummies are inspired by the legendary sativa strain, offering a delicious berry taste and a functional, social high. These edibles are perfect for those seeking clarity and mood elevation without heavy physical sedation.",
    effects: [
      {
        name: "Uplifted",
        val: 90
      },
      {
        name: "Focused",
        val: 85
      },
      {
        name: "Happy",
        val: 85
      }
    ],
    medical: [
      {
        name: "Social Anxiety",
        val: 80
      },
      {
        name: "Fatigue",
        val: 85
      },
      {
        name: "Stress",
        val: 75
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 80
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Talkative",
        val: 95
      }
    ]
  },
  {
    id: "p10",
    name: "Wedding Cake ",
    brand: "PremiumBuds",
    category: "Flower",
    price: 3575,
    thc: "26%",
    cbd: "0.1%",
    type: "Indica",
    rating: 4.7,
    reviews: 512,
    image: "https://www.olivastu.com/media/wysiwyg/strain.jpg",
    images: [
      "https://www.olivastu.com/media/wysiwyg/strain.jpg",
      "https://picsum.photos/seed/prod_10_1/800/800",
      "https://picsum.photos/seed/prod_10_2/800/800",
      "https://picsum.photos/seed/prod_10_3/800/800"
    ],
    description: "Wedding Cake is an uplifting indica-dominant hybrid strain known for its relaxing and euphoric effects. It yields a rich and tangy flavor profile with undertones of earthy pepper.",
    effects: [
      {
        name: "Relaxed",
        val: 90
      },
      {
        name: "Happy",
        val: 85
      },
      {
        name: "Aroused",
        val: 60
      }
    ],
    medical: [
      {
        name: "Pain",
        val: 85
      },
      {
        name: "Insomnia",
        val: 80
      },
      {
        name: "Appetite Loss",
        val: 75
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Dry Eyes",
        val: 70
      },
      {
        name: "Anxious",
        val: 20
      }
    ]
  },
  {
    id: "p11",
    name: "BOUTIQ 2g",
    brand: "BOUTIQ",
    category: "Vapes",
    price: 1375,
    thc: "85-95%",
    cbd: "0-1%",
    type: "Hybrid",
    rating: 4.8,
    reviews: 428,
    image: "https://boutiq-switchs.com/wp-content/uploads/2025/04/Screenshot-2024-09-19-at-12.24.08%E2%80%AFPM-1024x890.jpeg",
    images: [
      "https://boutiq-switchs.com/wp-content/uploads/2025/04/Screenshot-2024-09-19-at-12.24.08%E2%80%AFPM-1024x890.jpeg",
      "https://picsum.photos/seed/prod_11_1/800/800",
      "https://picsum.photos/seed/prod_11_2/800/800",
      "https://picsum.photos/seed/prod_11_3/800/800"
    ],
    description: "BOUTIQ 2G Disposables represent the pinnacle of vape tech, featuring a switchable dual-chamber system. Filled with premium live resin diamonds, it allows you to toggle between strains for a customized session, delivering unmatched flavor and potency in every cloud.",
    effects: [
      {
        name: "Versatile",
        val: 95
      },
      {
        name: "Euphoric",
        val: 92
      },
      {
        name: "Relaxed",
        val: 88
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 85
      },
      {
        name: "Pain",
        val: 80
      },
      {
        name: "Anxiety",
        val: 75
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Dizzy",
        val: 10
      }
    ]
  },
  {
    id: "p12",
    name: "YANA 1g (Gorilla Glue)",
    brand: "YANA",
    category: "Vapes",
    price: 3575,
    thc: "70-90%",
    cbd: "0%",
    type: "Indica",
    rating: 4.9,
    reviews: 184,
    image: "https://preview.redd.it/audo30exyjyf1.png?width=640&crop=smart&auto=webp&s=8b7cb9bbbbd134608b80085a9d4b932e832885f5",
    images: [
      "https://preview.redd.it/audo30exyjyf1.png?width=640&crop=smart&auto=webp&s=8b7cb9bbbbd134608b80085a9d4b932e832885f5",
      "https://picsum.photos/seed/prod_12_1/800/800",
      "https://picsum.photos/seed/prod_12_2/800/800",
      "https://picsum.photos/seed/prod_12_3/800/800"
    ],
    description: "YANA 1G Gorilla Glue is a heavy-duty distillate vape that brings the legendary potency of GG4 to your pocket. Expect deep, earthy diesel notes and a crushing body high that 'glues' you to the couch, making it the ultimate tool for deep recovery or ending the night.",
    effects: [
      {
        name: "Relaxed",
        val: 96
      },
      {
        name: "Sleepy",
        val: 92
      },
      {
        name: "Euphoric",
        val: 85
      }
    ],
    medical: [
      {
        name: "Pain",
        val: 95
      },
      {
        name: "Insomnia",
        val: 90
      },
      {
        name: "Stress",
        val: 85
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Heavy Lids",
        val: 90
      },
      {
        name: "Dizzy",
        val: 15
      }
    ]
  },
  {
    id: "p13",
    name: "Baby Jeeter Rosin Enhanced Diamonds ZKZ ",
    brand: "Jeeter",
    category: "Flower",
    price: 1500,
    thc: "35-45%",
    cbd: "0.1%",
    type: "Indica",
    rating: 4.7,
    reviews: 156,
    image: "https://tymber-blaze-products.imgix.net/jeeter-watermelon-zkz-f2e56608-8748-4ec5-9902-1eff5db1cf75.jpg",
    images: [
      "https://tymber-blaze-products.imgix.net/jeeter-watermelon-zkz-f2e56608-8748-4ec5-9902-1eff5db1cf75.jpg"
    ],
    description: "Baby Jeeter ZKZ pre-rolls are infused with premium live rosin and liquid diamonds to amplify the sweet, fruity profile of the Zkittlez strain. These potent mini pre-rolls deliver a cheerful, candy-flavored smoke that settles into deep relaxation.",
    effects: [
      {
        name: "Relaxed",
        val: 95
      },
      {
        name: "Sleepy",
        val: 85
      },
      {
        name: "Happy",
        val: 70
      }
    ],
    medical: [
      {
        name: "Insomnia",
        val: 90
      },
      {
        name: "Pain",
        val: 80
      },
      {
        name: "Stress",
        val: 75
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 80
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Dizzy",
        val: 20
      }
    ]
  },
  {
    id: "p14",
    name: "Cosmic Cherry Kush",
    brand: "FRYD",
    category: "Vapes",
    price: 2200,
    thc: "80-95%",
    cbd: "0-2%",
    type: "Sativa",
    rating: 4.9,
    reviews: 423,
    image: "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/64013cfe4ff6f334844c52c476b4e9e7.jpeg?width=552&height=552",
    images: [
      "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/64013cfe4ff6f334844c52c476b4e9e7.jpeg?width=552&height=552"
    ],
    description: "Cosmic Cherry Kush is a high-potency live resin vape featuring a deep cherry profile with smooth kush undertones. This FRYD favorite delivers an out-of-this-world cerebral high followed by a soothing body relaxation.",
    effects: [
      {
        name: "Euphoric",
        val: 90
      },
      {
        name: "Happy",
        val: 85
      },
      {
        name: "Relaxed",
        val: 75
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 85
      },
      {
        name: "Depression",
        val: 80
      },
      {
        name: "Pain",
        val: 70
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Dizzy",
        val: 20
      }
    ]
  },
  {
    id: "p15",
    name: "Starburst OG",
    brand: "FRYD",
    category: "Vapes",
    price: 3800,
    thc: "80-95%",
    cbd: "0-2%",
    type: "Hybrid",
    rating: 4.8,
    reviews: 215,
    image: "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/af426458d307e4e6895d785aa6aaff9e.jpeg?width=552&height=552",
    images: [
      "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/af426458d307e4e6895d785aa6aaff9e.jpeg?width=552&height=552"
    ],
    description: "Starburst OG by FRYD captures the sweet, nostalgic taste of fruit candy in a potent live resin form. This powerful hybrid provides a balanced experience, offering a rushing head high that transitions into deep physical tranquility.",
    effects: [
      {
        name: "Creative",
        val: 88
      },
      {
        name: "Uplifted",
        val: 85
      },
      {
        name: "Relaxed",
        val: 80
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 85
      },
      {
        name: "Anxiety",
        val: 80
      },
      {
        name: "Pain",
        val: 70
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Dry Eyes",
        val: 65
      },
      {
        name: "Drowsy",
        val: 30
      }
    ]
  },
  {
    id: "p16",
    name: "Space Zkittlez",
    brand: "FRYD",
    category: "Vapes",
    price: 1800,
    thc: "80-95%",
    cbd: "0-2%",
    type: "Indica",
    rating: 4.6,
    reviews: 189,
    image: "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/b400a85ca99d16ba57b2a0f04affd29f.jpeg?width=1104&height=1104",
    images: [
      "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/b400a85ca99d16ba57b2a0f04affd29f.jpeg?width=1104&height=1104"
    ],
    description: "Space Zkittlez is an elite FRYD disposable that launches you into deep relaxation with its tropical, candy-like terpene profile. Known for its indica dominance, it’s perfect for ending a long day with sweet clouds and heavy lids.",
    effects: [
      {
        name: "Relaxed",
        val: 95
      },
      {
        name: "Sleepy",
        val: 90
      },
      {
        name: "Happy",
        val: 85
      }
    ],
    medical: [
      {
        name: "Insomnia",
        val: 90
      },
      {
        name: "Pain",
        val: 85
      },
      {
        name: "Stress",
        val: 80
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 80
      },
      {
        name: "Dry Eyes",
        val: 70
      },
      {
        name: "Dizzy",
        val: 20
      }
    ]
  },
  {
    id: "p17",
    name: "Lunar Limeade",
    brand: "FRYD",
    category: "Vapes",
    price: 4500,
    thc: "85-95%",
    cbd: "0-2%",
    type: "Sativa",
    rating: 4.9,
    reviews: 340,
    image: "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/b10df1ccfb96a9164986a72a79337063.jpeg?width=552&height=552",
    images: [
      "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/b10df1ccfb96a9164986a72a79337063.jpeg?width=552&height=552"
    ],
    description: "Lunar Limeade is a refreshing, citrus-bursting live resin from FRYD. This sativa-rich blend provides an immediate energetic lift, sharpening focus and elevating mood with its sharp lime flavor and smooth finish.",
    effects: [
      {
        name: "Energetic",
        val: 92
      },
      {
        name: "Focused",
        val: 88
      },
      {
        name: "Happy",
        val: 85
      }
    ],
    medical: [
      {
        name: "Fatigue",
        val: 85
      },
      {
        name: "Depression",
        val: 80
      },
      {
        name: "Stress",
        val: 75
      }
    ],
    negatives: [
      {
        name: "Anxious",
        val: 40
      },
      {
        name: "Dry Mouth",
        val: 80
      },
      {
        name: "Dizzy",
        val: 15
      }
    ]
  },
  {
    id: "p18",
    name: "Meteor Mango",
    brand: "FRYD",
    category: "Vapes",
    price: 3500,
    thc: "85-95%",
    cbd: "0-2%",
    type: "Hybrid",
    rating: 4.8,
    reviews: 520,
    image: "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/3ff0681920062650197a4a5313317484.jpeg?width=1104&height=1104",
    images: [
      "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/3ff0681920062650197a4a5313317484.jpeg?width=1104&height=1104"
    ],
    description: "Meteor Mango delivers a creamy, tropical explosion with every hit. This FRYD live resin hybrid is masterfully refined to achieve a perfect balance between cerebral stimulation and physical ease, leaving you floating in blissful euphoria.",
    effects: [
      {
        name: "Euphoric",
        val: 90
      },
      {
        name: "Happy",
        val: 88
      },
      {
        name: "Relaxed",
        val: 75
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 85
      },
      {
        name: "Pain",
        val: 75
      },
      {
        name: "Loss of Appetite",
        val: 70
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Hungry",
        val: 90
      }
    ]
  },
  {
    id: "p19",
    name: "Watermelon Eclipse",
    brand: "FRYD",
    category: "Vapes",
    price: 4000,
    thc: "85-95%",
    cbd: "0-2%",
    type: "Indica",
    rating: 4.7,
    reviews: 890,
    image: "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/71a758377845f1c5466a08e072dae22e.jpeg?width=1104&height=1104",
    images: [
      "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/71a758377845f1c5466a08e072dae22e.jpeg?width=1104&height=1104"
    ],
    description: "Watermelon Eclipse by FRYD is a fresh, juicy indica that hits like a summer evening. Its mouth-watering watermelon flavor is followed by a heavy body high that’s perfect for unwinding after dark or preparing for deep, restful sleep.",
    effects: [
      {
        name: "Relaxed",
        val: 95
      },
      {
        name: "Sleepy",
        val: 92
      },
      {
        name: "Happy",
        val: 80
      }
    ],
    medical: [
      {
        name: "Insomnia",
        val: 90
      },
      {
        name: "Stress",
        val: 85
      },
      {
        name: "Pain",
        val: 80
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Dry Eyes",
        val: 70
      },
      {
        name: "Groggy",
        val: 40
      }
    ]
  },
  {
    id: "p20",
    name: "Gamma Guava Burst",
    brand: "FRYD",
    category: "Vapes",
    price: 4500,
    thc: "85-95%",
    cbd: "0-2%",
    type: "Sativa",
    rating: 4.9,
    reviews: 410,
    image: "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/87821e14e934616da3b4d458962af715.jpeg?width=1104&height=1104",
    images: [
      "https://dr5urbp0m8lal.cloudfront.net/1/product_photo/87821e14e934616da3b4d458962af715.jpeg?width=1104&height=1104"
    ],
    description: "Gamma Guava Burst is a tropical powerhouse from FRYD that energizes the senses. This sativa-dominant live resin offers a sharp, sweet guava burst that stimulates creativity and social engagement, making it an ideal choice for daytime activities.",
    effects: [
      {
        name: "Energetic",
        val: 94
      },
      {
        name: "Creative",
        val: 90
      },
      {
        name: "Talkative",
        val: 85
      }
    ],
    medical: [
      {
        name: "Fatigue",
        val: 90
      },
      {
        name: "Stress",
        val: 80
      },
      {
        name: "Depression",
        val: 80
      }
    ],
    negatives: [
      {
        name: "Anxious",
        val: 35
      },
      {
        name: "Dry Mouth",
        val: 75
      },
      {
        name: "Dry Eyes",
        val: 50
      }
    ]
  },
  {
    id: "p21",
    name: "Grapefruit (Gummies)",
    brand: "Faded",
    category: "Edibles",
    price: 3800,
    thc: "50mg per piece (varies)",
    cbd: "0-5mg",
    type: "Sativa",
    rating: 4.6,
    reviews: 250,
    image: "https://fadedfruitsgummy.com/wp-content/uploads/2024/06/FADED-FRUITS-GUMMIES-500MG-GRAPEFRUIT-HAZE-FRONT-2048x1536-1.jpg",
    images: [
      "https://fadedfruitsgummy.com/wp-content/uploads/2024/06/FADED-FRUITS-GUMMIES-500MG-GRAPEFRUIT-HAZE-FRONT-2048x1536-1.jpg"
    ],
    description: "Faded Grapefruit Gummies offer a bright, tangy citrus punch with an uplifting sativa-like edge. Infused with high-quality distillate, each gummy provides a clean, social high that’s perfect for daytime fun or creative projects.",
    effects: [
      {
        name: "Uplifted",
        val: 88
      },
      {
        name: "Happy",
        val: 85
      },
      {
        name: "Talkative",
        val: 75
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 85
      },
      {
        name: "Depression",
        val: 80
      },
      {
        name: "Fatigue",
        val: 70
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 80
      },
      {
        name: "Appetite Boost",
        val: 90
      },
      {
        name: "Clear-headed",
        val: 85
      }
    ]
  },
  {
    id: "p22",
    name: "Cherry OG (Gummies)",
    brand: "Faded",
    category: "Edibles",
    price: 2000,
    thc: "50mg per piece (varies)",
    cbd: "0-5mg",
    type: "Indica",
    rating: 4.8,
    reviews: 600,
    image: "https://static.wixstatic.com/media/722e51_42a0d4dfa1d94d43a5214badb5a4e54f~mv2.png/v1/fit/w_500,h_500,q_90/file.png",
    images: [
      "https://static.wixstatic.com/media/722e51_42a0d4dfa1d94d43a5214badb5a4e54f~mv2.png/v1/fit/w_500,h_500,q_90/file.png"
    ],
    description: "Cherry OG Gummies by Faded combine the classic stone of OG Kush with a sweet cherry twist. These potent indica-dominant treats deliver a heavy-hitting body high that melts away tension and leaves you deeply relaxed.",
    effects: [
      {
        name: "Relaxed",
        val: 92
      },
      {
        name: "Sleepy",
        val: 85
      },
      {
        name: "Hungry",
        val: 80
      }
    ],
    medical: [
      {
        name: "Pain",
        val: 90
      },
      {
        name: "Insomnia",
        val: 85
      },
      {
        name: "Muscle Spasms",
        val: 80
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 85
      },
      {
        name: "Dry Eyes",
        val: 65
      },
      {
        name: "Munchies",
        val: 95
      }
    ]
  },
  {
    id: "p23",
    name: "Blue Slush (Gummies)",
    brand: "Faded",
    category: "Edibles",
    price: 2200,
    thc: "50mg per piece (varies)",
    cbd: "0-5mg",
    type: "Indica",
    rating: 4.9,
    reviews: 750,
    image: "https://officialfadedfruits.com/wp-content/uploads/2024/07/blue-slush-300x300.jpg",
    images: [
      "https://officialfadedfruits.com/wp-content/uploads/2024/07/blue-slush-300x300.jpg"
    ],
    description: "Blue Slush Gummies from Faded Fruit are a fan favorite, offering a nostalgic blue raspberry flavor with a potent kick. These gummies are known for their slow-creeping high that eventually settles into a complete state of physical and mental bliss.",
    effects: [
      {
        name: "Relaxed",
        val: 90
      },
      {
        name: "Euphoric",
        val: 88
      },
      {
        name: "Giggly",
        val: 75
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 90
      },
      {
        name: "Pain",
        val: 85
      },
      {
        name: "Anxiety",
        val: 80
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 80
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Dizzy",
        val: 20
      }
    ]
  },
  {
    id: "p24",
    name: "Blue Slush (Gummies)",
    brand: "Faded",
    category: "Edibles",
    price: 6500,
    thc: "50mg per piece (varies)",
    cbd: "0-5mg",
    type: "Indica",
    rating: 5,
    reviews: 200,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR5VvAgxyO26ytlBRa5_slqPEADKo3TUab9g&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR5VvAgxyO26ytlBRa5_slqPEADKo3TUab9g&s"
    ],
    description: "Blue Slush Gummies from Faded Fruit (Premium Pack) provide an elevated experience with higher purity and intense blue raspberry terpenes. This premium edition is crafted for connoisseurs seeking the ultimate fusion of sweet flavor and potent, long-lasting effects.",
    effects: [
      {
        name: "Euphoric",
        val: 95
      },
      {
        name: "Uplifted",
        val: 85
      },
      {
        name: "Relaxed",
        val: 80
      }
    ],
    medical: [
      {
        name: "Stress",
        val: 90
      },
      {
        name: "Pain",
        val: 85
      },
      {
        name: "Depression",
        val: 80
      }
    ],
    negatives: [
      {
        name: "Paranoid",
        val: 15
      },
      {
        name: "Dry Eyes",
        val: 50
      },
      {
        name: "Dizzy",
        val: 10
      }
    ]
  },
  {
    id: "p25",
    name: "CBX Flower 3.5g",
    brand: "Cannabiotix",
    category: "Flower",
    price: 5500,
    thc: "30%",
    cbd: "0%",
    type: "Hybrid",
    rating: 4.9,
    reviews: 310,
    image: "https://picsum.photos/seed/prod_25/800/800",
    images: [
      "https://picsum.photos/seed/prod_25/800/800"
    ],
    description: "Premium indoor grown flower.",
    effects: [
      {
        name: "Happy",
        val: 90
      },
      {
        name: "Euphoric",
        val: 75
      },
      {
        name: "Uplifted",
        val: 70
      }
    ],
    medical: [
      {
        name: "Depression",
        val: 85
      },
      {
        name: "Pain",
        val: 75
      },
      {
        name: "Stress",
        val: 70
      }
    ],
    negatives: [
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Dizzy",
        val: 20
      },
      {
        name: "Paranoid",
        val: 15
      }
    ]
  },
  {
    id: "p26",
    name: "Connected Cannabis 3.5g",
    brand: "Connected",
    category: "Flower",
    price: 6000,
    thc: "28%",
    cbd: "0%",
    type: "Hybrid",
    rating: 4.8,
    reviews: 420,
    image: "https://picsum.photos/seed/prod_26/800/800",
    images: [
      "https://picsum.photos/seed/prod_26/800/800"
    ],
    description: "Designer weed with exotic genetics.",
    effects: [
      {
        name: "Relaxed",
        val: 85
      },
      {
        name: "Euphoric",
        val: 75
      },
      {
        name: "Uplifted",
        val: 70
      }
    ],
    medical: [
      {
        name: "Pain",
        val: 80
      },
      {
        name: "Stress",
        val: 70
      },
      {
        name: "Anxiety",
        val: 65
      }
    ],
    negatives: [
      {
        name: "Dry Mouth",
        val: 70
      },
      {
        name: "Dry Eyes",
        val: 60
      },
      {
        name: "Dizzy",
        val: 20
      }
    ]
  }
];

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on search
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const toggleFilter = (state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredProducts = PRODUCTS.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!product.name.toLowerCase().includes(query) && 
          !product.brand.toLowerCase().includes(query) &&
          !product.category.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts];

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const visibleProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 relative">
      {/* SIDEBAR FILTERS (Desktop) */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-24 space-y-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl">
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </h3>
            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="text-sm font-medium text-slate-200 mb-3">Category</h4>
                <div className="space-y-2">
                  {["Flower", "Edibles", "Vapes", "Concentrates", "Tinctures", "Topicals"].map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                        className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500" 
                      />
                      <span className="text-sm text-slate-300">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div>
                <h4 className="text-sm font-medium text-slate-200 mb-3">Brands</h4>
                <div className="space-y-2">
                  {["Cookies", "Diamond Labs", "ExtractLabs", "VapeNation", "Cannafarm"].map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                        className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500" 
                      />
                      <span className="text-sm text-slate-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE FILTERS OVERLAY */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col pt-20 px-4 pb-6 overflow-y-auto md:hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-white flex items-center gap-2 text-xl">
              <Filter className="h-5 w-5" /> Filters
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)} className="text-slate-400 hover:text-white">
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="space-y-8 flex-1">
            {/* Category Filter */}
            <div>
              <h4 className="text-base font-medium text-slate-200 mb-4">Category</h4>
              <div className="space-y-3">
                {["Flower", "Vapes", "Edibles", "Concentrates"].map(category => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                      className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 w-5 h-5" 
                    />
                    <span className="text-base text-slate-300">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h4 className="text-base font-medium text-slate-200 mb-4">Brands</h4>
              <div className="space-y-3">
                {["Cookies", "Diamond Labs", "ExtractLabs", "VapeNation", "Cannafarm"].map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                      className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 w-5 h-5" 
                    />
                    <span className="text-base text-slate-300">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white min-h-[44px] text-lg"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Vapes & More</h1>
            <p className="text-slate-400">Discover Everything That You Need. </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="md:hidden w-full sm:w-auto gap-2 bg-white/5 border-white/10 text-white min-h-[44px]" onClick={() => setIsMobileFiltersOpen(true)}>
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="relative mb-8 group focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_30px_rgba(16,185,129,0.2)] rounded-md transition-all duration-300">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors z-10" />
          <Input 
            placeholder="Search products, brands, or categories..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-12 pl-10 bg-white/5 backdrop-blur-md border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-0 border-0 relative z-0"
          />
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">No products found</h3>
            <p className="text-slate-400">Try adjusting your filters or search query.</p>
            <Button 
              variant="outline" 
              className="mt-4 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                setSearchQuery("");
                setSearchParams({});
                setSelectedCategories([]);
                setSelectedBrands([]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {visibleProducts.map((product) => (
              <div key={product.id} className="group bg-[#1F2937]/30 backdrop-blur-2xl rounded-3xl border border-white/5 overflow-hidden hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.3)] hover:border-emerald-500/30 transition-all duration-500 ease-out flex flex-col">
                <Link to={`/products/${product.id}`} className="flex flex-col flex-1 relative z-10 w-full h-full cursor-pointer focus:outline-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="aspect-[4/3] overflow-hidden relative bg-[#0a0f16]/50 flex items-center justify-center p-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 drop-shadow-2xl mix-blend-screen"
                      referrerPolicy="no-referrer"
                    />
                    <Badge className="absolute top-4 left-4 shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-[#1F2937]/80 text-white border-white/10 backdrop-blur-xl px-3 py-1 font-medium tracking-wide">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="text-xs text-emerald-400 mb-2 font-medium tracking-widest uppercase">{product.brand}</div>
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-300 transition-colors tracking-tight leading-snug">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                      <span className="font-semibold text-white">{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                    
                    <div className="flex gap-2 mb-5">
                      <span className="text-xs font-semibold bg-[#111827] text-slate-300 px-2.5 py-1.5 rounded-lg border border-white/5 tracking-wide">THC: {product.thc}</span>
                      <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-2.5 py-1.5 rounded-lg border border-emerald-500/20 tracking-wide shadow-[0_0_10px_rgba(16,185,129,0.1)]">CBD: {product.cbd}</span>
                    </div>
                    
                    <div className="mt-auto pt-2">
                      <span className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl font-semibold outline-none backdrop-blur-xl bg-[#111827]/40 border border-white/10 text-slate-200 shadow-sm transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-emerald-600/20 group-hover:to-emerald-500/20 group-hover:border-emerald-500/50 group-hover:text-emerald-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap justify-center items-center gap-2">
            <Button 
              variant="outline" 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white disabled:opacity-50 min-h-[44px] px-4"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className={`w-11 h-11 min-h-[44px] min-w-[44px] ${currentPage === i + 1 ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none" : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button 
              variant="outline" 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white disabled:opacity-50 min-h-[44px] px-4"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
