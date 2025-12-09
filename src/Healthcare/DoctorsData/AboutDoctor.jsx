import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 28px 24px 18px 24px;
  margin: 0 auto;
  max-width: 370px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInCard 0.7s ease;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 12px 36px rgba(0,0,0,0.16);
    transform: translateY(-5px) scale(1.025);
  }
  @keyframes fadeInCard {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: none; }
  }
`;

export const TopRated = styled.span`
  background: linear-gradient(90deg,#ffe082,#ffd54f);
  color: #b26a00;
  font-size: 0.93rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 2px 10px;
  margin-bottom: 7px;
  display: inline-block;
  letter-spacing: 0.5px;
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  margin: 7px 0 2px 0;
  color: #658F9B;
  font-size: 0.97rem;
`;

export const Icon = styled.img`
  height: 18px;
  width: 18px;
  margin-right: 4px;
  vertical-align: middle;
`;


export const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`;
export const Avatar = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  object-fit: cover;
  background: #f5f7fa;
  border: 3px solid #eaf6fb;
`;
export const VerifiedBadge = styled.span`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: #00b38e;
  color: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0,179,142,0.15);
`;

export const Name = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #02475B;
  margin: 0 0 4px 0;
  text-align: center;
`;

export const Speciality = styled.div`
  font-size: 1.05rem;
  color: #0087BA;
  font-weight: 500;
  margin-bottom: 4px;
  text-align: center;
`;

export const CategoryChip = styled.span`
  background: #e6f9f3;
  color: #00b38e;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  padding: 2px 12px;
  margin-bottom: 6px;
  display: inline-block;
`;

export const ExpRatingRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Rating = styled.span`
  color: #f7b500;
  font-size: 1.08rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const Experience = styled.span`
  color: #658F9B;
  font-size: 1rem;
  font-weight: 500;
`;

export const About = styled.p`
  color: #555;
  font-size: 0.97rem;
  margin: 6px 0 12px 0;
  text-align: center;
  min-height: 38px;
`;

export const SlotList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 10px;
  justify-content: center;
`;

export const SlotPill = styled.span`
  background: #eaf6fb;
  color: #0087ba;
  font-size: 0.93rem;
  border-radius: 10px;
  padding: 3px 10px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const BookButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${props => props.variant === 'video' ? '#FECF62' : '#C6EAFE'};
  color: #02475B;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  &:hover {
    background: ${props => props.variant === 'video' ? '#ffe5a1' : '#e0f2ff'};
    transform: scale(1.04);
    box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  }
`;

export const DetailsDiv= styled.div`

height:90px;
width:220px;
line-Height:0.3;
font-weight:100;
font-size: small;
`
export const DoctorDiv = styled.div`
background-color:white;
border-radius:5px;
width:320px;
height:186px;
margin:30px;
line-height:0.2;
padding:5px;
padding-top:25px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;


`

const AboutDoctor = (props) => {
  const { id, name, photo, category, specialization, experience, rating, about, availableSlots: availableSlotsStr, languages, hospital } = props.item;
  // Parse availableSlots if it's a string, otherwise use as is or default to empty array
  const availableSlots = typeof availableSlotsStr === 'string' ? JSON.parse(availableSlotsStr) : Array.isArray(availableSlotsStr) ? availableSlotsStr : [];

  const handleClick = (e) => {
    localStorage.setItem("DoctorsData", JSON.stringify(e));
  };

  return (
    <Link to={`/DoctorSpecialities/${id}`} style={{ textDecoration: "none" }} onClick={() => handleClick(props.item)} aria-label={`View details for Dr. ${name}`}>
      <Card>
        <AvatarWrapper>
          <Avatar
            src={photo || "https://cdn.kyruus.com/pm-dev/assets/provider-avatar-male-rectangle.png"}
            alt={`Photo of Dr. ${name}`}
            onError={e => e.target.src = "https://cdn.kyruus.com/pm-dev/assets/provider-avatar-male-rectangle.png"}
          />
          <VerifiedBadge title="Verified">✔</VerifiedBadge>
        </AvatarWrapper>
        {rating && rating >= 4.5 && <TopRated>Top Rated</TopRated>}
        <CategoryChip>{category}</CategoryChip>
        <Name>{name}</Name>
        <Speciality>{specialization}</Speciality>
        <ExpRatingRow>
          <Experience>{experience} yrs exp</Experience>
          <Rating>★ {rating ? rating.toFixed(1) : "4.7"}</Rating>
        </ExpRatingRow>
        <InfoRow>
          <Icon src="https://newassets.apollo247.com/images/language.svg" alt="Languages" title="Languages" />
          <span>{languages}</span>
          <Icon src="https://newassets.apollo247.com/images/new-location.svg" alt="Hospital" title="Hospital" />
          <span>{hospital}</span>
        </InfoRow>
        <About>{about}</About>
        {Array.isArray(availableSlots) && availableSlots.length > 0 && (
          <SlotList>
            {availableSlots.map((slot, idx) => (
              <SlotPill key={idx}>{slot}</SlotPill>
            ))}
          </SlotList>
        )}
        <ButtonRow>
          <BookButton variant="video" aria-label={`Book video consult with Dr. ${name}`}>
            <img src="https://newassets.apollo247.com/images/videoConsult.svg" alt="video" style={{height:'22px'}}/>
            Video Consult
          </BookButton>
          <BookButton variant="hospital" aria-label={`Book hospital visit with Dr. ${name}`}>
            <img src="https://newassets.apollo247.com/images/hospitalVisit.svg" alt="hospital" style={{height:'22px'}}/>
            Hospital Visit
          </BookButton>
        </ButtonRow>
      </Card>
    </Link>
  );
};

export default AboutDoctor