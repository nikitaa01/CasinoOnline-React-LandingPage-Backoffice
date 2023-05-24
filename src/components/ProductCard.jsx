export default function ProductCard({link, img, text}) {
    return (
        <a href={link} className="flex flex-col justify-center items-center hover:scale-110 hover:shadow p-5 rounded-full duration-300 gap-2">
            <img src={img} className="w-32"/>
            {text}
        </a>
    )
}