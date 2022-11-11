const Card = ({thumbnail}) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="card" src={thumbnail.url} alt={thumbnail.title}/>
    )
}

export default Card;