import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

function User() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const {id} = useParams();
    useEffect(() => {
        axios(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => 
          setUser(res.data)
        ).finally(() => setLoading(false));
    }, [id]);
    return (
        <div id='users__app__userdetail'>
            <div className='headline'>
                <h1>User Detail</h1>
            </div>
            <div className='detail'>
                {loading && <div>Loading...</div>}
                {!loading && <code>{JSON.stringify(user)}</code>}
            </div>
            <div className='next__button'>
                <Link to={`/users/${parseInt(id) + 1}`}>Next User ({parseInt(id) + 1})</Link>
            </div>
            
        </div>
    );
}

export default User;
