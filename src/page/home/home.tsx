import { useLocation, Link } from 'react-router';
import PostSection from '../../components/post-section/post-section';
import './home.css';

export default function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    return (
        <section className="feed">
            <div className="follow-nav home-follow-nav">
                <span className={type != 'following' ? 'follow-active' : ''}>
                    <Link to={`${location.pathname}`}>For You</Link>
                </span>
                <span className={type == 'following' ? 'follow-active' : ''}>
                    <Link to={`${location.pathname}?type=following`}>Following</Link>
                </span>
            </div>
            <PostSection type={type || ''} />
        </section>
    );
}