
const features = [
  {
    title: "Fingerprint Access",
    img: "/images/feature-fingerprint.png",
    desc: "Easily access your lock by using soft touch finger scan on the handle, for upto 1000ns.",
  },
  {
    title: "RFID Card Access",
    img: "/images/feature-rfid.png",
    desc: "Use RFID card tags for easy access to unlock the door.",
  },
  {
    title: "Manual Key Operation",
    img: "/images/feature-key.png",
    desc: "No worries if you forget PIN or fingerprint is not working. Manual keys (2nos) can be used.",
  },
  {
    title: "PIN Access",
    img: "/images/feature-pin.png",
    desc: "Set PIN as well for accessing your lock, for upto 6-digit.",
  },
  {
    title: "User Configuration",
    img: "/images/feature-userconfig.png",
    desc: "Set Admin PIN and user PIN to prevent any unauthorized access. Also add temporary PIN for guests.",
  },
  {
    title: "Alarm Alerts",
    img: "/images/feature-alarm.png",
    desc: "Set of alarms available like intrusion alarm, low battery alarm, lock open too long alarm.",
  },
  {
    title: "Dual Authentication Access",
    img: "/images/feature-dual.png",
    desc: "Use access features in combination like fingerprint + password to increase security.",
  },
  {
    title: "Emergency Battery Power",
    img: "/images/feature-battery.png",
    desc: "If the battery dies, you can use a power bank to supply temporary power to the lock.",
  },
  {
    title: "Strong Locking Bolts",
    img: "/images/feature-lockingbolt.png",
    desc: "Multi SS bolts with high-security makes it harder for intruders to break the lock.",
  },
];

export default function ProductFeatures() {
  return (
    <div className="container-flued my-4">
      <div className="row g-4">
        {features.map((item, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <div className="p-3 h-100 text-center d-flex flex-column align-items-center justify-content-start bg-white">
              <div
                className=" mb-4 border overflow-hidden"
                style={{ minWidth:250, maxWidth: "312px", maxHeight: "312px",borderRadius:'10px' }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-100 h-100 mb-3"
                  style={{ objectFit: "fill" }}
                />
              </div>

              <div style={{minWidth:250,maxWidth:300}} className='text-start'>
                <h6 className="fw-bold">{item.title}</h6>
              <p className="text-muted small">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
