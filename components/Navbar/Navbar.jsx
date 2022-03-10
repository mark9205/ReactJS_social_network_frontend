
import Nav from "./Nav/Nav";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        frItem: state.siteBar.friends
    }
};

const mapDispatchToProps = (dispatch) => {
    return null
}

const NavBar = connect(mapStateToProps, mapDispatchToProps)(Nav)

export default NavBar