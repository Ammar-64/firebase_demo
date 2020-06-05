import React, {useState, useEffect} from 'react';
import db from './firebaseConfig';

const App = () => {
  // constructor() {
  //   super();
  //   this.state = {
  //    header: "",
  //    email: "",
  //    fullname: "",     
  //   };
  // }
  const [header, setHeader] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState("");
  const [users, setUser] = useState([]);

  const fetchData = async ()=>{
    const res = await db.collection('header').doc('header').get()
    const data = res.data()
    setHeader(
      data.header
    );
    const userRes = await db.collection('users').get();
    const usersData = userRes.docs.map(user=> user.data())
    setUser(usersData)
  
  }
  console.log(header)
  console.log(users);
  
  useEffect(() => {
    fetchData();
    
  },[]);
  // const updateInput = e => {
  //   setEmail({
  //     [e.target.name]: e.target.value
  //   });
  //   setFullname({
  //     [e.target.name]: e.target.value
  //   })
  // }
  const addUser = e => {
    e.preventDefault();
    db.collection('users').add({
      fullNmae: fullname,
      email: email,
    })
    setEmail( "" );
    setFullname("" )
  };
  
    return (
      <>
        <h1>{header}</h1>
        <form onSubmit={addUser}>
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            onChange={e => setFullname(e.target.value)} 
            value={fullname}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={e => setEmail(e.target.value)} 
            value={email}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>users</h4>
        {users.map(user => <div>{user.fullNmae}</div>)}
        </>
        );
      }
    
   export default App;
