import {Link} from "react-router-dom";

export default function Pager({current, arr}) {
    /*
    * current : 현재 페이지의 위치
    * arr : lists
    * */
    return (
        <div className="pager">
            <Prev current={current} arr={arr}/>
            <Next current={current} arr={arr}/>
        </div>
    )
}

function Prev({current, arr}) {
    const currentIndex = arr.findIndex(v => v.id === current.id);
    const lastIndex = arr.length - 1;

    if (currentIndex === lastIndex) return null;

    const prevPage = arr[currentIndex + 1];
    const pathName = window.location.pathname.split('/')[1];
    const link = `/${pathName}/${prevPage.id}`;

    return <PageTo link={link} page={prevPage} cn="prev"/>
}

function Next({current, arr}) {
    const currentIndex = arr.findIndex(v => v.id === current.id);
    const firstIndex = 0;

    if (currentIndex === firstIndex) return null;

    const nextPage = arr[currentIndex - 1];
    const pathName = window.location.pathname.split('/')[1];
    const link = `/${pathName}/${nextPage.id}`

    return <PageTo link={link} page={nextPage} cn="next"/>;
}

function PageTo({link, page, cn}) {
    const context = cn === 'next' ? '다음글' : '이전글';
    return (
        <Link to={link} className={cn}>
            <span>{context}</span>
            <p>{page.title}</p>
        </Link>
    )
}
