#include "include/Calculator.h"
#include "include/Validate.h"
#include<stdio.h>
#include<string.h>
int MAX_SIZE=500;
void main()
{ 
	float result;
    	char expression[MAX_SIZE];
    	printf("Calculator (Enter 'exit' to Exit)\n");
    	while(1)
    	{
		printf("shubham@jadhav: ");
		scanf("%[^\n]%*c",expression);
		if(strcmp(expression,"exit")==0)
			break;
		int check=validateExpression(expression);
        	if(check)
		{
		    	result=evaluate(expression);
		    	printf("Result : %f\n",result);
        	}
        	else
        	{
            		printf("Result : Invalid Expression\n");
        	} 
    	}
} 
