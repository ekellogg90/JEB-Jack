import { Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

export default function Profile() {

    // const sample = [
    //     {
    //         _id: 0,
    //         username: 'Eric',
    //         wins: 1,
    //     }
    // ]

    const { loading, data } = useQuery(GET_ME);
    // const userData = data?.me || sample;
    // console.log("Profile log:", userData);

      // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  const userData = data?.me || {};
  console.log("Profile log:", userData);

    return (        
        <>
            <div className=''>
                <Container>
                    <h1>Welcome {userData.username}</h1>
                </Container>
                </div>
                <Container>
                    <h2 className='pt-5'>
                        {userData.wins
                            ? `You have ${userData.wins} ${userData.wins === 1 ? 'win!' : 'wins!'}:`
                            : 'You have no wins yet!'}
                    </h2>
                </Container>
        </>
    );
};
