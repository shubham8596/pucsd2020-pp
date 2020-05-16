#include "../include/Validate.h"
#include<string.h>
#include<ctype.h>
int validateExpression(char expression[])
{
	int i;
	int symbolBalance=0;
	int toggle=1;
	for(i=0;i<strlen(expression);i++)
	{
		if(expression[i]==' ')
        		continue;
    		if(isdigit(expression[i]))
		{
		        while(isdigit(expression[i]) && i<strlen(expression))
            			i++;
        		i--;
        		if(toggle==1)
            			toggle=0;
        		else 
            			return 0;
    		}
    		else if(expression[i]=='+'||expression[i]=='-'||expression[i]=='*'||expression[i]=='/')
		{
		        if(toggle==0)
            			toggle=1;
        		else
            			return 0;
    		}
    		else if(expression[i]=='(')
        		symbolBalance++;
    		else if(expression[i]==')')
		{
		        symbolBalance--;
        		if(symbolBalance<0)
            			return 0;
    		}
    		else
        		return 0;
 	}
    	if(toggle==1 || symbolBalance!=0)
		return 0;
    	return 1;   
}
