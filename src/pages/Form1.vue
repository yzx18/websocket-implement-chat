<template>
   <div>

       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="活动名称" prop="name">
               <el-input v-model="ruleForm.name"></el-input>
           </el-form-item>
           <el-form-item label="活动区域" prop="region">
               <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                   <el-option label="区域一" value="shanghai"></el-option>
                   <el-option label="区域二" value="beijing"></el-option>
               </el-select>
           </el-form-item>
           <el-form-item label="活动时间" required>
               <el-col :span="11">
                   <el-form-item prop="date1">
                       <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                       style="width: 100%;"></el-date-picker>
                   </el-form-item>
               </el-col>
               <el-col class="line" :span="2">-</el-col>
               <el-col :span="11">
                   <el-form-item prop="date2">
                       <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                   </el-form-item>
               </el-col>
           </el-form-item>
           <el-form-item label="即时配送" prop="delivery">
               <el-switch v-model="ruleForm.delivery"></el-switch>
           </el-form-item>
           <el-form-item label="活动性质" prop="type">
               <el-checkbox-group v-model="ruleForm.type">
                   <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                   <el-checkbox label="地推活动" name="type"></el-checkbox>
                   <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                   <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
               </el-checkbox-group>
           </el-form-item>
           <el-form-item label="特殊资源" prop="resource">
               <el-radio-group v-model="ruleForm.resource">
                   <el-radio label="线上品牌商赞助"></el-radio>
                   <el-radio label="线下场地免费"></el-radio>
               </el-radio-group>
           </el-form-item>
           <el-form-item label="活动形式" prop="desc">
               <el-input type="textarea" v-model="ruleForm.desc"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click="submitForm()">立即创建</el-button>
               <el-button @click="resetForm('ruleForm')">重置</el-button>
           </el-form-item>
       </el-form>

       <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
           <el-steps :active="checkid" simple>
               <el-step title="步骤 1" icon="el-icon-edit"></el-step>
               <el-step title="步骤 2" icon="el-icon-upload"></el-step>
               <el-step title="步骤 3" icon="el-icon-picture"></el-step>
           </el-steps>
           <el-form :model="form" v-if="checkid==1">
               <el-form-item label="活动名称" :label-width="formLabelWidth">
                   <el-input v-model="form.name" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动区域" :label-width="formLabelWidth">
                   <el-select v-model="form.region" placeholder="请选择活动区域">
                       <el-option label="区域一" value="shanghai"></el-option>
                       <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
               </el-form-item>
           </el-form>
           <el-form :model="form" v-if="checkid==2">
               <el-form-item label="活动名称" :label-width="formLabelWidth">
                   <el-input v-model="form.name" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动区域" :label-width="formLabelWidth">
                   <el-select v-model="form.region" placeholder="请选择活动区域">
                       <el-option label="区域一" value="shanghai"></el-option>
                       <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
               </el-form-item>
           </el-form>
           <el-form :model="form" v-if="checkid==3">
               <el-form-item label="活动名称" :label-width="formLabelWidth">
                   <el-input v-model="form.name" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动区域" :label-width="formLabelWidth">
                   <el-select v-model="form.region" placeholder="请选择活动区域">
                       <el-option label="区域一" value="shanghai"></el-option>
                       <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="活动区域" :label-width="formLabelWidth">
                   <el-select v-model="form.region" placeholder="请选择活动区域">
                       <el-option label="区域一" value="shanghai"></el-option>
                       <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="活动区域" :label-width="formLabelWidth">
                   <el-select v-model="form.region" placeholder="请选择活动区域">
                       <el-option label="区域一" value="shanghai"></el-option>
                       <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
               </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
               <button @click="pre()">上一步</button>
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
               <button @click="next()">下一步</button>
           </div>
       </el-dialog>

       <button @click="dialogFormVisible=true">点击我出现</button>
   </div>

</template>
<script>
    export default {
        data() {
            return {
                checkid:1,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                dialogFormVisible: false,
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        alert('submit!')
                        console.log(this.ruleForm)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            next(){

              if(this.checkid<3){
                  this.checkid++;
              }else{
                  this.checkid=3;
              }
            },
            pre(){
                if(this.checkid>1){
                    this.checkid--;
                }else{
                    this.checkid=1;
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
