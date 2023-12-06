import signupImg from "/images/signup.gif";
import DoctorAvatar from "/images/doctor-img01.png";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
 
  const [url, setUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "patient",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const{name,email,password,gender,role}=formData;
    
    const config={headers:{"Content-Type":"application/json"}};
    const{data}=await axios.post("http://localhost:8000/api/v1/auth/register",{...formData,url},config);
    console.log(data);
    return navigate("/login");
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ===== Image Box ====== */}
          <div className="hidden md:block lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt="lottie"
                className="rounded-l-lg w-full"
              />
            </figure>
          </div>

          {/* ===== Signup Form ====== */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor leading-9 text-[22px] font-bold mb-10">
              Create an <span className="text-primaryColor">account </span>
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 px-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer mb-2 "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 px-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer mb-2 "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 px-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer mb-2 "
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    id=""
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-15px leading-7 px-4 py-3 outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender :
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-15px leading-7 px-4 py-3 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center gap-3">
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img
                    src={DoctorAvatar}
                    alt=""
                    className="w-full rounded-full"
                  />
                </figure>

                <div className="relative w-[160px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                   
                    accept="image/*"
                    onChange={(e)=>{
                      const reader=new FileReader();
                      reader.onload=()=>{
                        if(reader.readyState===2){
                          setUrl(reader.result);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pinter"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload your photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button className="btn w-full rounded-md" type="submit">
                  Signup
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link to="/login" className="text-primaryColor ml-2">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
