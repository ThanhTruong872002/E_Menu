export default function Footer() {
  return (
    <div className="bg-[#FFFAE3] py-14 ">
      <div className="w-[90%] mx-auto ">
        <div className="flex justify-between gap-16 flex-col lg:flex-row ">
          <div className="text-center lg:text-start">
            <img src="./images/Logo.svg" alt="" className="mx-auto lg:mx-0"/>
            <p className="w-full lg:w-[293px] text-[1.6rem] font-[400] mb-[30px] mt-6 leading-[24px]">
              In the new era of technology we look a in the future with
              certainty and pride to for our company and.
            </p>
            <ul className="flex gap-4 justify-center lg:justify-start">
              <li>
                <img src="./images/social-1.svg" alt="" />
              </li>
              <li>
                <img src="./images/social-2.svg" alt="" />
              </li>
              <li>
                <img src="./images/social-3.svg" alt="" />
              </li>
              <li>
                <img src="./images/social-4.svg" alt="" />
              </li>
            </ul>
          </div>
          <div className="flex justify-around lg:flex-row lg:flex lg:gap-[150px]">
            <div>
              <h2 className="font-[600] mb-16">Pages</h2>
              <ul className="flex flex-col gap-10">
                <li>Home</li>
                <li>About</li>
                <li>Menu</li>
                <li>Pricing</li>
                <li>Blog</li>
                <li>Contact</li>
                <li>Delivery</li>
              </ul>
            </div>
            <div>
              <h2 className="font-[600] mb-16">Utility Pages</h2>
              <ul className="flex flex-col gap-10">
                <li>Start Here</li>
                <li>Styleguide</li>
                <li>Password Protected</li>
                <li>404 Not Found</li>
                <li>Licenses</li>
                <li>Changelog</li>
                <li>View More</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img src="./images/footer-1.svg" alt="" className="rounded-2xl" />
            </div>
            <div>
              <img src="./images/footer-2.svg" alt="" className="rounded-2xl" />
            </div>
            <div>
              <img src="./images/footer-3.svg" alt="" className="rounded-2xl" />
            </div>
            <div>
              <img src="./images/footer-4.svg" alt="" className="rounded-2xl" />
            </div>
          </div>
        </div>
        <div className="w-full bg-black h-[1px] mt-[100px]"></div>
        <p className="font-[400] text-[1.6rem] mt-[30px] text-center">
          Copyright © 2023 Hashtag Developer. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
