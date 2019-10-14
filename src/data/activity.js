import axios from 'axios'

function Activity (Obj) {
  this.id = Obj.actId

  this.title = Obj.title

  this.type = Obj.cateName
  this.location = Obj.location
  this.start_time = Obj.beginTime
  this.end_time = Obj.endTime
  this.reg_start_time = Obj.signupBeginTime
  this.reg_end_time = Obj.signupEndTime
  this.needSignIn = Obj.needCheckin

  if (this.reg_start_time === '1970-01-01 08:00:00') {
    this.needRegister = false
  } else {
    this.needRegister = true
  }

  this.organization = Obj.organizerType
  this.image = Obj.picture

  this.text = ''
}

Activity.prototype.getDetails = function () {
  return axios.post('activity/detail', {
    actId: this.id
  }).then(res => {
    this.text = res.data.activity.description
    if (res.data.activity.descPicture) {
      this.image = res.data.activity.descPicture[0]
    }
  })
}

Activity.prototype.register = function () {
  return axios.post('participation/signup', {
    actId: this.id
  }).then(res => {
    if (res.data.status !== 200) {
      throw res.data
    } else {
      return true
    }
  })
}

Activity.prototype.unRegister = function () {
  return axios.post('participation/cancel', {
    actId: this.id
  }).then(res => {
    if (res.data.status !== 200) {
      throw res.data
    } else {
      return true
    }
  })
}

export default function getActivities () {
  let activities = []
  return axios.post('activity/list', {
    offset: 0,
    limit: 10,
    state: '已发布'
  }).then(res => {
    for (let data of res.data.page.activities) {
      activities.push(new Activity(data))
    }
    return activities
  })
}
