// import material icons
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import CameraIcon from "@mui/icons-material/Camera";
import AccesTimeIcon from "@mui/icons-material/AccessTime";
import BackHandIcon from "@mui/icons-material/BackHand";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const IconSelector = ({ icon }: { icon: string }) => {
	switch (icon) {
		case "Home":
			return <HomeIcon />;
		case "Graph":
			return <BarChartIcon />;
		case "Camera":
			return <CameraIcon />;
		case "Log":
			return <AccesTimeIcon />;
		case "Manual":
			return <BackHandIcon />;
		case "Settings":
			return <SettingsIcon />;
		case "Log out":
			return <LogoutIcon />;
		default:
			return <HomeIcon />;
	}
}

export default IconSelector;