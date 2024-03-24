import React from "react";

const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, author, Time, Source } = props;
    return (
        <div className='my-5' >
            <div className="card" style={{ width: "18rem" }}>
                <img src={!imageUrl ? "https://images.hindustantimes.com/img/2022/06/10/550x309/WhatsApp_Image_2021-09-18_at_09.42.18_1631944439782_1654819913837.jpeg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}... <h6><span className="badge  bg-primary">New</span></h6><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {Source}
                        <span className="visually-hidden">unread messages</span>
                    </span></h5>
                    <p className="card-text">{description}...</p>
                    <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                    <p className="card-text"><small className="text-muted">By {author ? author : ""} updated {new Date(Time).toGMTString()} </small></p>

                </div>
            </div>

        </div>
    )
}



export default Newsitem
