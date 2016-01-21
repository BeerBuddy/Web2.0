const roleNameAdmin = "admin";
const roleNameUser = "user";
var roles={
	admin : roleNameAdmin,
	user : roleNameUser,
	isUser : function (user)
	{
		if(user)
		{
			if(user.role === roleNameUser)
			{
				return true;
			}
		}
		return false;
	},
	isAdmin : function (user){
		if(user)
		{
			if(user.role === roleNameAdmin)
			{
				return true;
			}
		}
		return false;
	},
	getAvailableRoles: [roleNameAdmin, roleNameUser]
}

module.exports = roles;