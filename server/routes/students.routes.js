import {Router} from 'express'; 
import * as studentsCtrl from '../controllers/students.controller';
const router = Router() ;

router.post('/' , studentsCtrl.createStudents)

router.get('/' , studentsCtrl.getAllStudents)

router.get('/:studentsId' , studentsCtrl.getStudentsById) 

router.put('/:studentsId' , studentsCtrl.updateStudentById)

router.delete('/:studentsId' , studentsCtrl.deleteStudentsById);
 
router.post('/deletemany', studentsCtrl.DeleteQuantity);

export default router ;