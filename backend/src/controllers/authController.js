const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



// ================= REGISTER USER (DONOR + SEEKER) =================

const registerUser = async (req, res) => {

    try {

        const {

            fullName,
            email,
            phone,
            password,
            role,


            // SEEKER DETAILS
            patientName,
            relationship,
            bloodGroupNeeded,
            unitsNeeded,
            urgency,
            medicalReason,
            hospitalName,
            doctorName


        } = req.body;



        // Check existing user

        const existingUser = await User.findOne({

            $or: [

                { email },

                { phone }

            ]

        });



        if (existingUser) {

            return res.status(400).json({

                message: "User already exists"

            });

        }



        // Password encryption

        const hashedPassword = await bcrypt.hash(password, 10);



        // Create User

        const user = await User.create({

            fullName,

            email,

            phone,

            password: hashedPassword,

            role,


            // seeker fields

            patientName,

            relationship,

            bloodGroupNeeded,

            unitsNeeded,

            urgency,

            medicalReason,

            hospitalName,

            doctorName


        });



        res.status(201).json({

            success:true,

            message:"User Registered Successfully",

            userId:user._id

        });



    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};






// ================= LOGIN USER =================


const login = async(req,res)=>{


    try{


        const {

            email,

            password

        } = req.body;




        // Find user

        const user = await User.findOne({

            email

        });



        if(!user){


            return res.status(400).json({

                success:false,

                message:"User not found"

            });


        }




        // Compare password


        const isMatch = await bcrypt.compare(

            password,

            user.password

        );




        if(!isMatch){


            return res.status(400).json({

                success:false,

                message:"Invalid Password"

            });


        }






        // Create JWT token


        const token = jwt.sign(


            {

                userId:user._id,

                role:user.role

            },


            process.env.JWT_SECRET,


            {

                expiresIn:"7d"

            }


        );







        res.status(200).json({


            success:true,


            message:"Login Successful",


            token,


            role:user.role,


            user:{


                id:user._id,

                fullName:user.fullName,

                email:user.email,

                phone:user.phone


            }


        });



    }


    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};



























// ================= EXPORT ALL =================


module.exports = { registerUser, login };