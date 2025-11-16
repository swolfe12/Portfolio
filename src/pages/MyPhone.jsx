import Phone from '../components/Phone';
import answer from './../assets/hangup.PNG';
import hangup from '../assets/answer.PNG';

const MyPhone = () => {
return (

    <div className = "myPhone">
        <Phone />
        <div className="btn-bar">
            <img src={answer} className="answer-call" alt="Answer Call Button"></img>
            <div className="home-btn"></div>
            <img src={hangup} className="end-call" alt="End Call Button"></img>
      </div>
    </div>
)
}

export default MyPhone;