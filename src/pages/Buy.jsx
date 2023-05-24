import Box from "../components/UI/Box";
import { useLangContext } from "../contexts/LangContext";
import ProductCard from "../components/ProductCard"

export default function Buy() {
    const { langValues } = useLangContext()

    const products = [
        {
            link: "/checkout/10",
            img: "/images/10.jpg",
            text: langValues.buy.card.button.replace('{coins}', 10)
        },
        {
            link: "/checkout/50",
            img: "/images/50.jpg",
            text: langValues.buy.card.button.replace('{coins}', 50)
        },
        {
            link: "/checkout/100",
            img: "/images/2954.jpg",
            text: langValues.buy.card.button.replace('{coins}', 100)
        },
        {
            link: "/checkout/500",
            img: "/images/500.jpg",
            text: langValues.buy.card.button.replace('{coins}', 500)
        },
    ]

    return (
        <Box>
            <h3 className="text-lg">{langValues.buy.title}</h3>
            <div className="grid grid-cols-2 gap-10">
                {products.map((p, i) => <ProductCard key={i} {...p} />)}
            </div>
        </Box>
    )
}