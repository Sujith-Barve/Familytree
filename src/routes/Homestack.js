import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import home from '../components/Home';
import familyadd from '../components/familyadd';
import fampage from '../components/Familypage';
import datcheck from '../components/databasecheck';


const valstack= {

    databasecheck :
    {
        screen:datcheck,
    },
    Home :
    {
        screen : home,
        navigationOptions: {
            title: 'Home',
            headerShown: false,
            },

    },
    FamPage :
    {
        screen : fampage,
        navigationOptions: {
            title : null, 
            }
    },
    AddFam :
    {
        screen : familyadd,
        navigationOptions: {
            title : null, 
            }
    },
    
};

const Homestack = createStackNavigator(valstack);
export default createAppContainer(Homestack); 