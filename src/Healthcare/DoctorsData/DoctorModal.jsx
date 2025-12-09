import React from "react";
import styled, { keyframes } from "styled-components";
import DoctorReviewsCalendar from './DoctorReviewsCalendar';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(40px); }
  to { opacity: 1; transform: none; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.32);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;
`;

const ModalCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 10px 36px rgba(0,0,0,0.18);
  padding: 34px 32px 28px 32px;
  min-width: 340px;
  max-width: 98vw;
  width: 420px;
  animation: ${fadeIn} 0.32s;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: #f7f8fa;
  border: none;
  border-radius: 50%;
  width: 38px; height: 38px;
  font-size: 1.5rem;
  color: #02475B;
  cursor: pointer;
  transition: background 0.18s;
  &:hover { background: #eaf6fb; }
`;

const Avatar = styled.img`
  width: 90px; height: 90px; border-radius: 50%; object-fit: cover; margin-bottom: 10px;
`;

const Name = styled.h2`
  font-size: 1.35rem; font-weight: 700; color: #02475B; margin: 0 0 5px 0; text-align: center;
`;
const Speciality = styled.div`
  font-size: 1.08rem; color: #0087BA; font-weight: 500; margin-bottom: 4px; text-align: center;
`;
const CategoryChip = styled.span`
  background: #e6f9f3; color: #00b38e; font-size: 0.97rem; font-weight: 600; border-radius: 12px; padding: 2px 12px; margin-bottom: 6px; display: inline-block;
`;
const InfoRow = styled.div`
  display: flex; gap: 10px; align-items: center; justify-content: center; margin: 10px 0 2px 0; color: #658F9B; font-size: 0.98rem;
`;
const About = styled.p`
  color: #555; font-size: 1.03rem; margin: 10px 0 12px 0; text-align: center; min-height: 38px;
`;
const SlotList = styled.div`
  display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 10px; justify-content: center;
`;
const SlotPill = styled.span`
  background: #eaf6fb; color: #0087ba; font-size: 0.93rem; border-radius: 10px; padding: 3px 10px;
`;
const BookButton = styled.button`
  width: 100%; padding: 12px 0; border: none; border-radius: 7px; font-size: 1.07rem; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; background: #FECF62; color: #02475B; box-shadow: 0 1px 4px rgba(0,0,0,0.03); margin-bottom: 10px; &:hover { background: #ffe5a1; transform: scale(1.04); box-shadow: 0 4px 16px rgba(0,0,0,0.10); }
`;

export default function DoctorModal({ open, onClose, doctor }) {
  if (!open || !doctor) return null;
  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <CloseBtn aria-label="Close" onClick={onClose}>×</CloseBtn>
        <Avatar src={doctor.photo || "https://cdn.kyruus.com/pm-dev/assets/provider-avatar-male-rectangle.png"} alt={`Photo of Dr. ${doctor.name}`} />
        <div style={{display:'flex', justifyContent:'center', gap:'8px', marginBottom:'6px'}}>
          <CategoryChip>{doctor.category}</CategoryChip>
          {doctor.rating && doctor.rating >= 4.5 && <span style={{background:'#ffe082',color:'#b26a00',borderRadius:6,padding:'2px 8px',fontWeight:700}}>Top Rated</span>}
        </div>
        <Name>{doctor.name}</Name>
        <Speciality>{doctor.specialization}</Speciality>
        <InfoRow>
          <img src="https://newassets.apollo247.com/images/language.svg" alt="Languages" style={{height:18,marginRight:3}}/>
          <span>{doctor.languages}</span>
          <img src="https://newassets.apollo247.com/images/new-location.svg" alt="Hospital" style={{height:18,marginLeft:7,marginRight:3}}/>
          <span>{doctor.hospital}</span>
        </InfoRow>
        <About>{doctor.about}</About>
        {doctor.availableSlots && doctor.availableSlots.length > 0 && (
          <SlotList>
            {doctor.availableSlots.map((slot, idx) => (
              <SlotPill key={idx}>{slot}</SlotPill>
            ))}
          </SlotList>
        )}
        <DoctorReviewsCalendar 
          doctorId={doctor?.id} 
          doctorName={doctor?.name}
          doctorSpecialization={doctor?.specialization}
          userId={(() => { try { return JSON.parse(localStorage.getItem('user'))?.userId; } catch { return null; } })()} 
          onSlotSelect={slot => {}} 
        />
        <BookButton>
          <img src="https://newassets.apollo247.com/images/videoConsult.svg" alt="video" style={{height:'22px'}}/>
          Book Video Consult
        </BookButton>
        <BookButton style={{background:'#C6EAFE',marginBottom:0}}>
          <img src="https://newassets.apollo247.com/images/hospitalVisit.svg" alt="hospital" style={{height:'22px'}}/>
          Book Hospital Visit
        </BookButton>
      </ModalCard>
    </Overlay>
  );
}
