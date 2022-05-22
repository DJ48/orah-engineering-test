import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { Group } from "../entity/group.entity"
import { CreateGroupInput } from "../interface/group.interface"

export class GroupController {
  private groupRepository = getRepository(Group)

  async allGroups(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    // Return the list of all groups
    return this.groupRepository.find()
  }

  async createGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    // Add a Group
    const { body: params } = request

    const createGroupInput: CreateGroupInput = {
      name: params.name,
      number_of_weeks: params.number_of_weeks,
      roll_states: params.roll_states,
      incidents: params.incidents,
      ltmt: params.ltmt
    }
    const roll = new Group()
    roll.prepareToCreate(createGroupInput)
    return this.groupRepository.save(roll)
  }

  async updateGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    // Update a Group

    const { body: params } = request

    const groupToUpdate = await this.groupRepository.findOne(params.id)

    if(groupToUpdate === undefined){
      return {msg:"Invalid Id"}
    }else{
      groupToUpdate.id = params.id
      groupToUpdate.name = params.name
      groupToUpdate.number_of_weeks = params.number_of_weeks
      groupToUpdate.roll_states = params.roll_states
      groupToUpdate.incidents = params.incidents
      groupToUpdate.ltmt = params.ltmt

      return this.groupRepository.save(groupToUpdate)
    }
  }

  async removeGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    // Delete a Group

    const result = { msg : ""}
  
    let groupToRemove = await this.groupRepository.findOne(request.params.id)
    if(groupToRemove === undefined){
      result.msg="Invalid Id"
    }else{
      await this.groupRepository.remove(groupToRemove)
      result.msg="Group Deleted Successfully"
    }
    return result
  }

  async getGroupStudents(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
        
    // Return the list of Students that are in a Group
  }


  async runGroupFilters(request: Request, response: Response, next: NextFunction) {
    // Task 2:
  
    // 1. Clear out the groups (delete all the students from the groups)

    // 2. For each group, query the student rolls to see which students match the filter for the group

    // 3. Add the list of students that match the filter to the group
  }
}
