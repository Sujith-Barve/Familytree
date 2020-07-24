import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import home from '../components/Home';
import familyadd from '../components/familyadd';
import fampage from '../components/Familypage';
// import createemp from '../components/createemployee';
// import datcheck from '../components/datafrommysql';


const valstack= {

    // databasecheck :
    // {
    //     screen:datcheck,
    // },
    FamPage :
    {
        screen : fampage,
        navigationOptions: {
            title : null, 
            }
    },
    Home :
    {
        screen : home,
        navigationOptions: {
            title: 'Home',
            headerShown: false,
            },

    },
    
    // CreateEmp : 
    // {
    //     screen : createemp,
    //     navigationOptions: {
    //         title : null, 
    //         }
    // },
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