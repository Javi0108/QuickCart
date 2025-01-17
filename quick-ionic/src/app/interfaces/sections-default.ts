import { Product } from "./product.interface";

export const defaultSectionHeroData = {
    background: {
        image: null,
        overlay_opacity: null,
        fixed_background: null,
        hex_color: "#FFFFFF",
    },
    banner_1:
    {
        subtitle: "Big Sale Offer",
        title: "Get The Best Deal on CCTV Camera",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, asdasdasd sapiente exercitationem delectus quisquam incidunt voluptatibus ex accusamus, molestiae neque aspernatur. Por que simplemente ",
        price_text: "Combo Only:",
        price: "590$",
        button: "Shop Now",
        image: "http://localhost:8000/media/sections/default/hero_section/slider-bg1.jpg",
        related_product: null,
    },
    banner_2: {
        subtitle: "New line required",
        title: "iphone 13 pro max",
        price: "590$",
        image: "http://localhost:8000/media/sections/default/hero_section/slider-bnr.jpg",
        related_product: null,
    },
    banner_3: {
        title: "Weekly Sale!",
        content: "Saving up to 50% off all online store items this week.",
        button: "Shop Now",
        image: "http://localhost:8000/media/sections/default/hero_section/slider-bg2.jpg",
        related_product: null,
    }
}

export const defaultSectionBannersData = {
    background: {
        image: null,
        overlay_opacity: null,
        fixed_background: null,
        hex_color: "#FFFFFF",
    },
    banner_1: {
        title: "New line required",
        content: "iPhone 12",
        button: "Shop Now",
        image: "https://demo.graygrids.com/themes/shopgrids/assets/images/banner/banner-1-bg.jpg",
        related_product: null,
    },
    banner_2: {
        title: "New line required",
        content: "iPhone 12 Pro Max",
        button: "Shop Now",
        image: "https://demo.graygrids.com/themes/shopgrids/assets/images/banner/banner-2-bg.jpg",
        related_product: null,
    }

}

export const defaultSectionProductsData = {
    background: {
        image: null,
        overlay_opacity: null,
        fixed_background: null,
        hex_color: "#FFFFFF",
    },
    products: [] as Product[],
};


export const defaultSectionAboutOfData = {
    background: {
        image: null,
        overlay_opacity: null,
        fixed_background: null,
        hex_color: "#FFFFFF",
    },
    content: {
        type: "",
        subtitle: "OUR STORY",
        title: "Quality, not quantity",
        paragraph: "We have made quality our habit...",
        image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=606,fit=scale-down,q=100/mPoyZVg96EI62K0E/joel-filipe-unsplash-YlZPLyOrnxigROG5.jpg",
        related_product: null,    
    }
}
