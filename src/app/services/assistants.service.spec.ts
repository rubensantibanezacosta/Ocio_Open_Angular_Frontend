import { Asisstant } from 'src/app/models/assistant';
import { VariablesService } from './../../config/config';
import { HttpErrorResponse } from '@angular/common/http';


import { AssistantsService } from './assistants.service';
import { of, throwError } from 'rxjs';
import { User } from '../models/user';
import { not } from '@angular/compiler/src/output/output_ast';


describe('Assistants Service', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let assistantsService: AssistantsService;
  let variablesService: VariablesService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ['get']);
    variablesService = new VariablesService();
    assistantsService = new AssistantsService(httpClientSpy as any, variablesService);

  });

  fit('should return an assistant', async () => {
    const expectedAssistant: Asisstant = {
      event_id: 2,
      assistant: "email@email.com",
      attendance: true,
      excuse: "",
      user: new User()
    }

    await httpClientSpy.get.and.returnValue(of(expectedAssistant));
    let returnedAssistant: Asisstant;
    await assistantsService.getAssistantByPk(2, "email.com").subscribe((asisstant) => {
      returnedAssistant = asisstant;
      /* returnedAssistant.assistant="ssss"; */
      
    });
    expect(returnedAssistant.assistant).toEqual(expectedAssistant.assistant);
      expect(returnedAssistant.excuse).toEqual(expectedAssistant.excuse);
      expect(returnedAssistant.user).toEqual(expectedAssistant.user);
      expect(returnedAssistant.attendance).toBe(true);
  });

  fit('should return error', async () => {
    let errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not found'
    });


    await httpClientSpy.get.and.returnValue(throwError(errorResponse));
    let response;
    await assistantsService.getAssistantByPk(2, "email@email.com").subscribe(
      (assistant)=>{},
      (error) => {
      response = error;
    });
    expect(response).toEqual(errorResponse);
  });
});

/*   it('should be created', () => {
  expect(service).toBeTruthy();
}); */