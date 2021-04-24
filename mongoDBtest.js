
const mongoose = require('mongoose');
const {list,create,detail,update,remove} = require('./controller/users');

mongoose.connect('mongodb://localhost/chatbot', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log("Connected to mongod server")
});

const testFunction = async () => {
	//list()
	const allUserList = await list();
	
	//create(userData)
	const createdUser = await create({
		user_id: 'test',
		sex: 'male',
		city: 'Seoul',
		time:['12:11'],
		daily_alarm: true,
		rain_alarm: true,
		dust_alarm: false
	});
	
	console.log('createdUser : ', createdUser);
	
	//detail(user_id)
	const userDetail = await detail('test');
	
	console.log('userDetail : ', userDetail);
	
	//update(user_id, userData)
	const updatedUser = await update('test', {
		user_id: 'test',
		sex: 'female',
		city: 'Busan',
		time:['12:12'],
		daily_alarm: false,
		rain_alarm: false,
		dust_alarm: true
	});
	
	const allUserList2 = await list();
	console.log('allUser : ', allUserList2);
	//remove(user_id)
	const ret = await remove('test');
}
testFunction();