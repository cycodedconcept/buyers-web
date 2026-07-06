import {LuBookOpen, LuPhone, LuClock3} from "react-icons/lu"
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const TopInfo = () => {
  return (
		<>
			<div className="bg-heading py-4">
				<div className="container flex items-center justify-between px-3 lg:px-0">
					<div className="flex gap-8">
						<p className="text-sm text-line font-outfit font-medium flex gap-3 hidden lg:flex">
							<LuBookOpen size={20} /> 6, Taiwo Aina Street, Maryland, Lagos
						</p>
						<p className="text-sm text-line font-outfit font-medium flex gap-3 hidden lg:flex">
							<LuClock3 size={20} /> Mon - Sat 8.00 - 18.00
						</p>
						<p className="text-sm text-line font-outfit font-medium flex gap-3">
							<LuPhone size={20} /> (234) 812-3409-675
						</p>
					</div>
					<div>
						<p className="text-sm text-line font-outfit font-medium flex items-center gap-4">
              <span className="hidden lg:flex">Follow Us:</span>
              <FaFacebookF />
              <FaLinkedin />
              <FaXTwitter/>
              <FaInstagram className="hidden lg:flex"/>
              <FaYoutube  className="hidden lg:flex"/>
            </p>
					</div>
				</div>
			</div>
		</>
	);
}

export default TopInfo
