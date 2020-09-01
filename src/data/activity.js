import axios from 'axios'

function Activity (Obj) {
  this.id = Obj.actId

  this.title = Obj.title
  this.attendLimit = Obj.attendLimit
  this.attendCount = Obj.attendCount

  this.type = Obj.cateName
  this.location = Obj.location
  this.start_time = Obj.beginTime
  this.end_time = Obj.endTime
  this.reg_start_time = Obj.signupBeginTime
  this.reg_end_time = Obj.signupEndTime
  this.needSignIn = Obj.needCheckin

  if (this.reg_start_time === '1970-01-01 00:00:00') {
    this.needRegister = false
  } else {
    this.needRegister = true
  }

  if (Obj.descPicture) {
    this.images = Obj.descPicture.map(url => 'http://sclass.cafa.edu.cn' + url)
  } else {
    this.images = Obj.descPicture
  }

  this.organization = Obj.organizerType

  this.text = ''
}

Activity.prototype.getDetails = function () {
  return axios.post('activity/detail', {
    actId: this.id
  }).then(res => {
    this.text = res.data.activity.description
  })
}

Activity.prototype.register = function () {
  return axios.post('participation/signup', {
    actId: this.id
  }).then(res => {
    if (res.data.status !== 200) {
      throw res.data
    } else {
      this.attendCount += 1
      return true
    }
  })
}

Activity.prototype.unRegister = function () {
  if (new Date(this.end_time).getTime() < new Date().getTime()) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({msg: '活动已经结束'})
    })
  }
  return axios.post('participation/cancel', {
    actId: this.id
  }).then(res => {
    if (res.data.status !== 200) {
      throw res.data
    } else {
      this.attendCount -= 1
      return true
    }
  })
}

Activity.prototype.checkIfRegistered = function () {
  return axios.get(`participation/querySignedUp?actId=${this.id}`).then(res => {
    if (res.data.data) {
      return true
    } else {
      return false
    }
  })
}

export function getActivities () {
  let activities = []
  return axios.post('activity/list', {
    offset: 0,
    limit: 100,
    state: '已发布'
  }).then(res => {
    for (let data of res.data.page.activities) {
      activities.push(new Activity(data))
    }
    return activities
  })
}
export function getMyActivities () {
  let activities = []
  return axios.post('activity/mysignuplist', {
    state: '已发布'
  }).then(res => {
    for (let data of res.data.page.activities) {
      activities.push(new Activity(data))
    }
    return activities
  })
}

export function getMyEndActivities () {
  let activities = []
  return axios.post('activity/mysignuplist', {
    state: '已结束'
  }).then(res => {
    for (let data of res.data.page.activities) {
      activities.push(new Activity(data))
    }
    return activities
  })
}
