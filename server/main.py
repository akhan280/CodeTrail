import uvicorn
from dotenv import load_dotenv


load_dotenv()

def main():
    # TODO add envvars in prod
    uvicorn.run(
        app="generate:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )

if __name__ == '__main__':
    main()